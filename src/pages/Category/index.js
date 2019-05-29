import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './index.scss'
import { getCategoryList } from '../../api'
import { Table, Pagination } from 'antd'
const columns = [
	{
		title: 'ID',
		dataIndex: 'id',
		key: 'id'
	},
	{
		title: '名称',
		dataIndex: 'name',
		key: 'name'
	},
	{
		title: '图片',
		dataIndex: 'imageUrl',
		key: 'imageUrl'
	}
]
class Category extends Component {
	state = {
		list: [],
		loading: false,
		index: 1,
		total: 0,
		pageSize: 5
	}
	componentDidMount() {
		this.getCategoryList()
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
		return (
			<div className="category__container">
				<Table
					columns={columns}
					rowKey={row => row.id}
					dataSource={this.state.list}
					onChange={this.handleTableChange}
				/>
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
}

export default withRouter(Category)
