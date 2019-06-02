import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { getProductImagesByPid, addProductimage, updateProductimage, deleteProductimage } from '../../api'
import { Table, Button, Divider, Modal, Form, Input, Select, message } from 'antd'
const { Option } = Select
const { Column } = Table
const confirm = Modal.confirm
class ProductImage extends Component {
	state = {
		pid: null,
		list: [],
		visible: false,
		confirmLoading: false
	}
	componentDidMount() {
		const { match } = this.props
		const pid = match.params.pid
		this.setState({
			pid
		})
		this.getProductImagesByPid(pid)
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
						新 增
					</Button>
					<Divider type="vertical" />
					<Button type="default" onClick={() => this.props.history.goBack()}>
						返 回
					</Button>
				</div>
				<div>产品Id：{this.state.pid}</div>
				<div>
					<Table rowKey={row => row.id} dataSource={this.state.list}>
						<Column title="ID" dataIndex="id" key="id" />
						<Column title="产品ID" dataIndex="pid" key="pid" />
						<Column title="类型" dataIndex="type" key="type" />
						<Column title="地址" dataIndex="image" key="image" />
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
					title="新增(编辑)"
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
						<Form.Item label="类型：">
							{getFieldDecorator('type', {
								rules: [{ required: true, message: ' ' }]
							})(
								<Select>
									<Option value="type_single">type_single</Option>
									<Option value="type_detail">type_detail</Option>
								</Select>
							)}
						</Form.Item>
						<Form.Item label="地址：">
							{getFieldDecorator('image', {
								rules: [{ required: true, message: ' ' }]
							})(<Input />)}
						</Form.Item>
					</Form>
				</Modal>
			</div>
		)
	}
	handleAdd = () => {
		this.setState({
			visible: true
		})
	}
	handleOk = () => {
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const { pid } = this.state
				console.log(values)
				if (values.id) {
					updateProductimage({
						...values,
						pid: pid
					}).then(res => {
						if (res.success) {
							message.success('编辑成功')
						}
						this.getProductImagesByPid(pid)
					})
				} else {
					addProductimage({
						...values,
						pid: pid
					}).then(res => {
						if (res.success) {
							message.success('新增成功')
						}
						this.getProductImagesByPid(pid)
					})
				}
			}
		})
		this.setState({
			visible: false
		})
	}
	handleCancel = () => {
		this.setState({
			visible: false
		})
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
					type: record.type,
					image: record.image
				})
			}
		)
	}
	handleDelete = record => {
		// deleteProductimage
		const _this = this;
		confirm({
			title: '确定删除？',
			content: '这是不可逆操作，确定？',
			onOk() {
				deleteProductimage(record.id).then(res => {
					if (res.success) {
						message.success('删除成功')
						_this.getProductImagesByPid(_this.state.pid)
					}
				})
			},
			onCancel() {}
		})
	}
	getProductImagesByPid = async pid => {
		const res = await getProductImagesByPid(pid)
		if (res.success) {
			this.setState({
				list: res.data
			})
		}
	}
}

const WrappedProductImage = Form.create({ name: 'ProductImage' })(ProductImage)

export default withRouter(WrappedProductImage)
