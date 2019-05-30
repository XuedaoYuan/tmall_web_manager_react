import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { getPropertyByCid, deletePropertyById } from '../../api'
import { Table, Button, Divider } from 'antd'
import EditModal from './components/EditModal'
const { Column } = Table

class Property extends Component {
	state = {
		cid: null,
		list: [],
		visible: false,
		modalTitle: ''
	}
	componentDidMount() {
		const { match } = this.props
		const cid = match.params.cid
		this.setState({
			cid
		})
		this.handleGetPropertyByCid(cid)
	}
	handleGetPropertyByCid = async cid => {
		const res = await getPropertyByCid(cid)
		if (res.success) {
			this.setState({
				list: res.data
			})
		}
	}
	handleAdd = () => {
		this.setState({
			id: '',
			name: '',
			visible: true,
			modalTitle: '新增'
		})
	}
	handleCancel = (refresh = false) => {
		this.setState({
			visible: false,
			modalTitle: ''
		})
		if (refresh) {
			this.handleGetPropertyByCid(this.state.cid)
		}
	}
	handleEdit = record => {
		this.setState({
			visible: true,
			modalTitle: '编辑',
			id: record.id,
			name: ''
		})
	}
	handleDelete = record => {
		deletePropertyById(record.id).then(res => {
			if (res.success) {
				this.handleGetPropertyByCid(this.state.cid)
			}
		})
	}
	handleBack = () => {
		this.props.history.goBack()
	}
	render() {
		return (
			<div>
				<div>
					<Button type="primary" onClick={this.handleAdd}>
						新 增
					</Button>
					<Divider type="vertical" />
					<Button type="default" onClick={this.handleBack}>
						返 回
					</Button>
				</div>
				<div>分类ID：{this.state.cid}</div>
				<Table
					// columns={columns}
					rowKey={row => row.id}
					dataSource={this.state.list}
				>
					<Column title="ID" dataIndex="id" key="id" />
					<Column title="名称" dataIndex="name" key="name" />
					<Column
						title="操作"
						key="active"
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

				<EditModal
					cid={this.state.cid}
					id={this.state.id}
					name={this.state.name}
					visible={this.state.visible}
					title={this.state.modalTitle}
					cancel={this.handleCancel}
				/>
			</div>
		)
	}
}

export default withRouter(Property)
