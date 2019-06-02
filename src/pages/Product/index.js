import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { getProductByCid } from '../../api'
import { Button, Divider, Modal, Table, Form, Input, message } from 'antd'
import { addProduct, updateProduct, deleteProduct } from '../../api'
const { Column } = Table
class Product extends Component {
	state = {
		cid: null,
		list: [],
		visible: false,
		confirmLoading: false
	}
	componentDidMount() {
		const { match } = this.props
		const cid = match.params.cid
		this.setState({
			cid
		})
		this.handleGetProductByCid(cid)
	}

	render() {
		const { visible, confirmLoading } = this.state
		const formItemLayout = {
			labelCol: {
				span: 4
			},
			wrapperCol: {
				span: 20
			}
		}
		const { getFieldDecorator } = this.props.form
		return (
			<div>
				<div>
					<Button type="primary" onClick={this.handleAdd}>
						新增
					</Button>
					<Divider type="vertical" />
					<Button type="default" onClick={this.handleBack}>
						返回
					</Button>
				</div>
				<div>分类id： {this.state.cid}</div>
				<div>
					<Table rowKey={row => row.id} dataSource={this.state.list}>
						<Column title="ID" dataIndex="id" key="id" />
						<Column title="名称" dataIndex="name" key="name" />
						<Column title="原价" dataIndex="originalPrice" key="originalPrice" />
						<Column title="折扣价" dataIndex="promotePrice" key="promotePrice" />
						<Column title="库存" dataIndex="stock" key="stock" />
						<Column title="副标题" dataIndex="subTitle" key="subTitle" />
						<Column title="创建时间" dataIndex="createDate" key="createDate" />
						<Column
							title="操作"
							key="action"
							render={(text, record) => {
								return (
									<>
										<Button type="primary" onClick={this.handleEdit.bind(this, record)}>
											编 辑
										</Button>
										<Divider type="vertical" />
										<Button type="primary" onClick={this.handleEditImage.bind(this, record)}>
											编辑图片
										</Button>
										<Divider type="vertical" />
										<Button type="danger" onClick={this.handleDelete.bind(this, record)}>
											删 除
										</Button>
									</>
								)
							}}
						/>
					</Table>
				</div>
				<Modal
					destroyOnClose
					title="新增(编辑)分类"
					visible={visible}
					onOk={this.handleOk}
					confirmLoading={confirmLoading}
					onCancel={this.handleCancel}
				>
					<Form {...formItemLayout}>
						<Form.Item label="Id：">
							{getFieldDecorator('id', {
								rules: [{ required: false, message: ' ' }]
							})(<Input disabled />)}
						</Form.Item>
						<Form.Item label="名称：">
							{getFieldDecorator('name', {
								rules: [{ required: true, message: ' ' }]
							})(<Input />)}
						</Form.Item>
						<Form.Item label="副标题：">
							{getFieldDecorator('subTitle', {
								rules: [{ required: true, message: ' ' }]
							})(<Input />)}
						</Form.Item>
						<Form.Item label="原价：">
							{getFieldDecorator('originalPrice', {
								rules: [{ required: true, message: ' ' }]
							})(<Input />)}
						</Form.Item>
						<Form.Item label="折扣价：">
							{getFieldDecorator('promotePrice', {
								rules: [{ required: true, message: ' ' }]
							})(<Input />)}
						</Form.Item>
						<Form.Item label="库存：">
							{getFieldDecorator('stock', {
								rules: [{ required: true, message: ' ' }]
							})(<Input />)}
						</Form.Item>
					</Form>
				</Modal>
			</div>
		)
	}
	handleBack = () => {
		this.props.history.goBack()
	}
	handleAdd = () => {
		this.setState({
			visible: true
		})
	}
	handleDelete = async record => {
		const res = await deleteProduct(record.id)
		if (res.success) {
			message.success('删除成功')
			this.handleGetProductByCid(this.state.cid)
		}
	}
	handleEditImage = record => {
		this.props.history.push('/productimage/' + record.id)
	}
	handleEdit = record => {
		const { setFieldsValue } = this.props.form

		this.setState(
			{
				visible: true
			},
			() => {
				setFieldsValue({
					id: record.id,
					name: record.name,
					subTitle: record.subTitle,
					originalPrice: record.originalPrice,
					promotePrice: record.promotePrice,
					stock: record.stock
				})
			}
		)
	}
	handleGetProductByCid = async cid => {
		const res = await getProductByCid(cid)
		this.setState({
			cid,
			list: [...res.data]
		})
	}
	handleOk = () => {
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.setState({
					confirmLoading: true
				})
				if (values.id) {
					updateProduct({
						...values,
						cid: this.state.cid
					}).then(res => {
						if (res.success) {
							this.setState({
								confirmLoading: false,
								visible: false
							})
							message.success('编辑成功')
							this.handleGetProductByCid(this.state.cid)
						}
					})
				} else {
					addProduct({
						...values,
						cid: this.state.cid
					}).then(res => {
						if (res.success) {
							this.setState({
								confirmLoading: false,
								visible: false
							})
							message.success('新增成功')
							this.handleGetProductByCid(this.state.cid)
						}
					})
				}
			}
		})
	}
	handleCancel = () => {
		this.setState({
			visible: false
		})
	}
}

const WrappedProduct = Form.create({ name: 'Product' })(Product)

export default withRouter(WrappedProduct)
