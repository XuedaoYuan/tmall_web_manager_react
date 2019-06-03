import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { getPropertyValueList, updatePropertyValue } from '../../api'
import { Button } from 'antd'
import './index.scss'
class PropertyValue extends Component {
	state = {
		pid: 0,
		list: [
			//{ id: 14073, pid: 975, ptid: 273, value: '111', property: { id: 273, cid: 97, name: '层数' } }
		],
		ids: []
	}
	render() {
		const { ids, list } = this.state
		return (
			<div className="property-value__container">
				<h2>属性值设置</h2>
				<div>
					<Button type="default" onClick={this.handleBack}>
						返回
					</Button>
				</div>
				<p>产品ID：{this.state.pid}</p>
				{list.map((item, index) => (
					<div className="form-item" key={item.id}>
						<span className="label">{item.property.name}:</span>
						<input
							type="text"
							value={item['value']}
							onBlur={e => this.handleBlur(e, index)}
							onChange={e => this.handleChange(e, index)}
						/>
					</div>
				))}
				{/* <Button type="primary" onClick={this.handleConfirm}>
					确定
				</Button> */}
			</div>
		)
	}
	componentDidMount() {
		const { match } = this.props
		const pid = match.params.pid
		this.setState(
			{
				pid
			},
			() => {
				this.getPropertyValueList()
			}
		)
	}

	handleConfirm = () => {}
	handleChange = (e, index) => {
		const { list } = this.state
		list[index]['value'] = e.target.value
		this.setState({
			list: list
		})
	}
	handleBlur = (e, index) => {
		console.log(index)
		const { list } = this.state
		if (list[index]['value']) {
			updatePropertyValue({
				id: list[index]['id'],
				value: list[index]['value']
			})
		}
	}
	handleBack = () => {
		this.props.history.goBack()
	}
	getPropertyValueList = async () => {
		const { pid } = this.state
		const res = await getPropertyValueList(pid)
		if (res.success) {
			for (let i = 0, len = res.data.length; i < len; i++) {
				if (!res.data[i]['value']) {
					res.data[i]['value'] = ''
				}
			}
			this.setState({
				list: res.data
			})
		}
	}
}
// const WrappedPropertyValue = Form.create({ name: 'PropertyValue' })(PropertyValue)
export default withRouter(PropertyValue)
