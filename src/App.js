import React from 'react'
import { Route, Link, withRouter, Switch } from 'react-router-dom'
import { Button } from 'antd'
import './App.css'
import { Menu, Icon } from 'antd'
import Category from './pages/Category'
import User from './pages/User'
import Property from './pages/Property'
import Product from './pages/Product'
import ProductImage from "./pages/ProductImage"

class App extends React.Component {
	state = {
		current: 'category'
	}
	handleClick = e => {
		this.setState({
			current: e.key
		})
	}
	render() {
		return (
			<div className="App">
				<Menu theme="dark" onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
					<Menu.Item key="category">
						<Link to="/">
							<Icon type="meh" />
							分类管理
						</Link>
					</Menu.Item>
					<Menu.Item key="user">
						<Link to="/user">
							<Icon type="meh" />
							用户管理
						</Link>
					</Menu.Item>
				</Menu>
				<div className="main__container">
					<Switch>
						<Route exact={true} path={'/'} component={Category} />
						<Route path={'/user'} component={User} />
						<Route path={'/property/:cid'} component={Property} />
						<Route path={'/product/:cid'} component={Product} />
						<Route path={'/productimage/:pid'} component={ProductImage} />
					</Switch>
				</div>
			</div>
		)
	}
}

export default withRouter(App)
