import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Modal, Input, Button } from 'antd'
import { addProperty, updateProperty, getPropertyById } from '../../../api'

class EditModal extends Component {
	static defaultProps = {
		title: '',
		visible: false,
		cid: ''
	}
	static propTypes = {
		title: PropTypes.oneOf(['新增', '编辑', '']),
		visible: PropTypes.bool,
		cid: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
	}
	constructor(props) {
		super(props)
		this.state = {
			confirmLoading: false
		}
	}
	componentDidMount() {
		console.log('11')
	}
	render() {
		const { visible, title, id, name } = this.props
		const { confirmLoading } = this.state
		const { getFieldDecorator } = this.props.form

		const formItemLayout = {
			labelCol: {
				span: 4
			},
			wrapperCol: {
				span: 20
			}
		}
		return (
			<div>
				<Modal
					destroyOnClose
					title={title}
					visible={visible}
					onOk={this.handleOk}
					confirmLoading={confirmLoading}
					onCancel={this.handleCancel}
				>
					<Button onClick={this.getValue}>获取值</Button>
					<Form {...formItemLayout}>
						<Form.Item label="id:">
							{getFieldDecorator('id', {
								rules: [{ required: false, message: '' }]
							})(<Input disabled placeholder="id" />)}
						</Form.Item>
						<Form.Item label="名称:">
							{getFieldDecorator('name', {
								rules: [{ required: true, message: 'name necessary' }]
							})(<Input placeholder="name" />)}
						</Form.Item>
					</Form>
				</Modal>
			</div>
		)
	}
	handleOk = () => {
		this.props.form.validateFieldsAndScroll((err, values) => {
			this.setState({
				confirmLoading: true
			})
			if (!err) {
				const { id } = this.props
				if (id) {
					updateProperty(values).then(res => {
						this.setState({
							confirmLoading: false
						})
						this.props.cancel(true)
					})
				} else {
					addProperty({
						...values,
						cid: this.props.cid
					}).then(res => {
						this.setState({
							confirmLoading: false
						})
						this.props.cancel(true)
					})
				}
			}
		})
	}
	handleCancel = () => {
		this.props.cancel()
	}
	getValue = () => {
		const { setFieldsValue } = this.props.form
		if (this.props.id) {
			getPropertyById(this.props.id).then(res => {
				setFieldsValue({
					id: res.data.id,
					name: res.data.name
				})
			})
		}
		/* setFieldsValue({
			id,
			name
		}) */
	}
}

const WrappedEditModal = Form.create({ name: 'editModal' })(EditModal)

export default WrappedEditModal
