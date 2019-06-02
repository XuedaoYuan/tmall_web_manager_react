import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './index.scss'
import { getCategoryList, saveCategory, getCategory, updateCategory, deleteCategory } from '../../api'
import { Button, Modal, Table, Pagination, Form, Icon, Input, Divider, message } from 'antd'

const { Column } = Table
class Category extends Component {
	constructor(props) {
		super(props)
		this.state = {
			list: [],
			loading: false,
			index: 1,
			total: 0,
			pageSize: 5,
			visible: false,
			confirmLoading: false,
			name: ''
		}
	}

	componentDidMount() {
		this.getCategoryList()
	}
	handleEdit = record => {
		const { setFieldsValue } = this.props.form
		setFieldsValue(record)
		this.setState({
			visible: true
		})
		console.log(record)
	}
	handleEditProperty = record => {
		this.props.history.push('/property/' + record.id)
	}
	handleEditProduct = record => {
		this.props.history.push('/product/' + record.id)
	}
	handleDelete = record => {
		deleteCategory(record.id).then(res => {
			if (res.success) {
				message.success('删除成功')
				this.getCategoryList()
			}
		})
	}
	showAddModal = () => {
		const { setFieldsValue } = this.props.form
		setFieldsValue({
			name: '',
			imageUrl: ''
		})
		this.setState({
			visible: true
		})
	}
	handleOk = () => {
		this.setState({
			confirmLoading: true
		})
		this.props.form.validateFields((err, values) => {
			if (!err) {
				if (values.id) {
					updateCategory(values).then(res => {
						if (res.success) {
							this.setState({
								visible: false,
								confirmLoading: false
							})
							message.success('编辑成功')
							this.getCategoryList()
						}
					})
				} else {
					saveCategory(values).then(res => {
						if (res.success) {
							this.setState({
								visible: false,
								confirmLoading: false
							})
							message.success('新增成功')
							this.getCategoryList()
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

	getCategoryList = () => {
		this.setState({
			loading: true
		})
		getCategoryList({
			index: this.state.index,
			pageSize: this.state.pageSize
		}).then(res => {
			console.log(res)
			this.setState({
				loading: false,
				list: res.data.list,
				total: res.data.total
			})
		})
	}

	handleTableChange = (pagination, filters, sorter) => {
		this.getCategoryList()
	}
	handleIndexChange = (index, pageSize) => {
		console.log(index, pageSize)
		this.setState(
			{
				index
			},
			() => {
				this.getCategoryList()
			}
		)
	}
	handlePageSizeChange = (index, pageSize) => {
		console.log(index, pageSize)
		this.setState(
			{
				pageSize
			},
			() => {
				this.getCategoryList()
			}
		)
	}

	render() {
		const { visible, confirmLoading } = this.state
		const { getFieldDecorator } = this.props.form
		const formItemLayout = {
			labelCol: {
				xs: { span: 12 },
				sm: { span: 8 }
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 16 }
			}
		}
		return (
			<div className="category__container">
				<div>
					<Button onClick={this.showAddModal} type="primary">
						新 增
					</Button>
				</div>
				<Table
					// columns={columns}
					rowKey={row => row.id}
					dataSource={this.state.list}
					onChange={this.handleTableChange}
				>
					<Column title="ID" dataIndex="id" key="id" />
					<Column title="名称" dataIndex="name" key="name" />
					<Column title="图片" dataIndex="imageUrl" key="imageUrl" />
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
									<Button type="primary" onClick={this.handleEditProperty.bind(this, record)}>
										编辑属性
									</Button>
									<Divider type="vertical" />
									<Button type="primary" onClick={this.handleEditProduct.bind(this, record)}>
										编辑产品
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
				<div className="footer xd-pagination">
					<Pagination
						showQuickJumper
						showSizeChanger
						pageSizeOptions={['5', '10', '20']}
						pageSize={this.state.pageSize}
						current={this.state.index}
						total={this.state.total}
						onChange={this.handleIndexChange}
						onShowSizeChange={this.handlePageSizeChange}
					/>
				</div>
				<Modal
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
							})(
								<Input
									disabled
									prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
									placeholder="id"
								/>
							)}
						</Form.Item>
						<Form.Item label="分类名称：">
							{getFieldDecorator('name', {
								rules: [{ required: true, message: '请输入分类名称' }]
							})(
								<Input
									prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
									placeholder="分类名称"
								/>
							)}
						</Form.Item>
						<Form.Item label="分类图片：">
							{getFieldDecorator('imageUrl', {
								rules: [{ required: true, message: '请输入图片地址' }]
							})(
								<Input
									prefix={<Icon type="file-image" style={{ color: 'rgba(0,0,0,.25)' }} />}
									placeholder="分类图片地址"
								/>
							)}
						</Form.Item>
					</Form>
				</Modal>
			</div>
		)
	}
}
const WrappedCategory = Form.create({ name: 'Category' })(Category)
export default withRouter(WrappedCategory)
