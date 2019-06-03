import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { getUsers } from '../../api'
import { Table, Pagination } from 'antd'
const { Column } = Table

class User extends Component {
	state = {
		index: 1,
		pageSize: 10,
		total: 0,
		list: []
	}
	render() {
		return (
			<div>
				<h2>用户管理</h2>
				<div>
					<Table bordered dataSource={this.state.list}>
						<Column title="ID" dataIndex="id" key="id" />
						<Column title="名字" dataIndex="name" key="name" />
					</Table>
				</div>
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
			</div>
		)
	}
	componentDidMount() {
		this.handleGetUsers()
	}
	handleGetUsers = () => {
		getUsers({
			index: this.state.index,
			pageSize: this.state.pageSize
		}).then(res => {
			if (res.success) {
				const results = res.data.list.map(item => ({
					key: item.id,
					...item
				}))
				this.setState({
					list: results,
					total: res.data.total
				})
			}
		})
	}
	handleIndexChange = (index, pageSize) => {
		console.log(index, pageSize)
		this.setState(
			{
				index
			},
			() => {
				this.handleGetUsers()
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
				this.handleGetUsers()
			}
		)
	}
}

export default withRouter(User)
