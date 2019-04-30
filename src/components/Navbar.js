import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import "antd/lib/button/style/css";

const { Header } = Layout;

export class Navbar extends React.Component {
  render() {
    return (
      <div>
        <Layout>
          <Header>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["2"]}
              style={{
                lineHeight: "64px",
                fontSize: "18px",
                fontWeight: "bold"
              }}
            >
              <Menu.Item>Logo</Menu.Item>

              <Menu.Item>
                <Link to="/login">Login</Link>
              </Menu.Item>

              {/* <Menu.Item>Logo</Menu.Item> */}
            </Menu>
          </Header>
        </Layout>
      </div>
    );
  }
}
