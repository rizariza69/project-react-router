import React from "react";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete
} from "antd";

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const residences = [
  {
    value: "Jakarta",
    label: "Jakarta",
    children: [
      {
        value: "Jakarta Selatan",
        label: "Jakarta Selatan",
        children: [
          {
            value: "Kemang",
            label: "Kemang"
          }
        ]
      }
    ]
  },
  {
    value: "Yogyakarta",
    label: "Yogyakarta",
    children: [
      {
        value: "Yogyakarta",
        label: "Yogyakarta",
        children: [
          {
            value: "Pogung",
            label: "Pogung"
          }
        ]
      }
    ]
  }
];

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = [".com", ".org", ".net"].map(
        domain => `${value}${domain}`
      );
    }
    this.setState({ autoCompleteResult });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "86"
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "justify",
          // width: "400px"
          // marginTop: "20px",
          margin: "10px auto",
          // // padding: "30px 30px",
          border: "1px solid black ",
          width: "800px",
          borderRadius: "20px"
        }}
      >
        <Form
          {...formItemLayout}
          onSubmit={this.handleSubmit}
          style={{ margin: "10px 0" }}
        >
          <Form.Item label="E-mail">
            {getFieldDecorator("email", {
              rules: [
                {
                  type: "email",
                  message: "The input is not valid E-mail!"
                },
                {
                  required: true,
                  message: "Please input your E-mail!"
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Password">
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "Please input your password!"
                },
                {
                  validator: this.validateToNextPassword
                }
              ]
            })(<Input type="password" />)}
          </Form.Item>
          <Form.Item label="Confirm Password">
            {getFieldDecorator("confirm", {
              rules: [
                {
                  required: true,
                  message: "Please confirm your password!"
                },
                {
                  validator: this.compareToFirstPassword
                }
              ]
            })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
          </Form.Item>
          <Form.Item
            label={
              <span>
                Nickname&nbsp;
                <Tooltip title="What do you want others to call you?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator("nickname", {
              rules: [
                {
                  required: true,
                  message: "Please input your nickname!",
                  whitespace: true
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Habitual Residence">
            {getFieldDecorator("residence", {
              initialValue: ["zhejiang", "hangzhou", "xihu"],
              rules: [
                {
                  type: "array",
                  required: true,
                  message: "Please select your habitual residence!"
                }
              ]
            })(<Cascader options={residences} />)}
          </Form.Item>
          <Form.Item label="Phone Number">
            {getFieldDecorator("phone", {
              rules: [
                { required: true, message: "Please input your phone number!" }
              ]
            })(
              <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
            )}
          </Form.Item>
          <Form.Item label="Website">
            {getFieldDecorator("website", {
              rules: [{ required: true, message: "Please input website!" }]
            })(
              <AutoComplete
                dataSource={websiteOptions}
                onChange={this.handleWebsiteChange}
                placeholder="website"
              >
                <Input />
              </AutoComplete>
            )}
          </Form.Item>
          <Form.Item
            label="Captcha"
            extra="We must make sure that your are a human."
          >
            <Row gutter={8}>
              <Col span={12}>
                {getFieldDecorator("captcha", {
                  rules: [
                    {
                      required: true,
                      message: "Please input the captcha you got!"
                    }
                  ]
                })(<Input />)}
              </Col>
              <Col span={12}>
                <Button>Get captcha</Button>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            {getFieldDecorator("agreement", {
              valuePropName: "checked"
            })(
              <Checkbox>
                I have read the <a href="/">agreement</a>
              </Checkbox>
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export const WrappedRegistrationForm = Form.create({ name: "register" })(
  RegistrationForm
);

// import {
//   Form,
//   Input,
//   Tooltip,
//   Icon,
//   Cascader,
//   Select,
//   Row,
//   Col,
//   Checkbox,
//   Button,
//   AutoComplete
// } from "antd";

// const { Option } = Select;
// const AutoCompleteOption = AutoComplete.Option;

// const residences = [
//   {
//     value: "Jakarta",
//     label: "Jakarta",
//     children: [
//       {
//         value: "Jakarta Selatan",
//         label: "Jakarta Selatan",
//         children: [
//           {
//             value: "Pancoran",
//             label: "Pancoran"
//           },
//           {
//             value: "Kemang",
//             label: "Kemang"
//           },
//           {
//             value: "Pondok Indah",
//             label: "Pondok Indah"
//           }
//         ]
//       }
//     ]
//   },
//   {
//     value: "Bandung",
//     label: "Bandung",
//     children: [
//       {
//         value: "Bandung Utara",
//         label: "Bandung Utara",
//         children: [
//           {
//             value: "Dago",
//             label: "Dago"
//           },
//           {
//             value: "Cimbeuluit",
//             label: "Cimbeuluit"
//           }
//         ]
//       }
//     ]
//   },
//   {
//     value: "Yogyakarta",
//     label: "Yogyakarta",
//     children: [
//       {
//         value: "Yogyakarta",
//         label: "Yogyakarta",
//         children: [
//           {
//             value: "Pogung",
//             label: "Pogung"
//           }
//         ]
//       }
//     ]
//   }
// ];

// class RegistrationForm extends React.Component {
//   state = {
//     confirmDirty: false,
//     autoCompleteResult: []
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     this.props.form.validateFieldsAndScroll((err, values) => {
//       if (!err) {
//         console.log("Received values of form: ", values);
//       }
//     });
//   };

//   handleConfirmBlur = e => {
//     const value = e.target.value;
//     this.setState({ confirmDirty: this.state.confirmDirty || !!value });
//   };

//   compareToFirstPassword = (rule, value, callback) => {
//     const form = this.props.form;
//     if (value && value !== form.getFieldValue("password")) {
//       callback("Two passwords that you enter is inconsistent!");
//     } else {
//       callback();
//     }
//   };

//   validateToNextPassword = (rule, value, callback) => {
//     const form = this.props.form;
//     if (value && this.state.confirmDirty) {
//       form.validateFields(["confirm"], { force: true });
//     }
//     callback();
//   };

//   handleWebsiteChange = value => {
//     let autoCompleteResult;
//     if (!value) {
//       autoCompleteResult = [];
//     } else {
//       autoCompleteResult = [".com", ".org", ".net"].map(
//         domain => `${value}${domain}`
//       );
//     }
//     this.setState({ autoCompleteResult });
//   };

//   render() {
//     <div style={{display:"flex", justifyContent:"center", margin:"100px auto", border:"1px solid black", borderRadius:"20px"}}>

//     const { getFieldDecorator } = this.props.form;
//     const { autoCompleteResult } = this.state;

//     const formItemLayout = {
//       labelCol: {
//         xs: { span: 24 },
//         sm: { span: 8 },
//       },
//       wrapperCol: {
//         xs: { span: 24 },
//         sm: { span: 16 },
//       },
//     };
//     const tailFormItemLayout = {
//       wrapperCol: {
//         xs: {
//           span: 24,
//           offset: 0
//         },
//         sm: {
//           span: 16,
//           offset: 8
//         }
//       }
//     };
//     const prefixSelector = getFieldDecorator("prefix", {
//       initialValue: "86"
//     })(
//       <Select style={{ width: 70 }}>
//         <Option value="86">+86</Option>
//         <Option value="87">+87</Option>
//       </Select>
//     );

//     const websiteOptions = autoCompleteResult.map(website => (
//       <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
//     ));

//     return (

//       <Form {...formItemLayout} onSubmit={this.handleSubmit}>
//         <Form.Item label="E-mail">
//           {getFieldDecorator("email", {
//             rules: [
//               {
//                 type: "email",
//                 message: "The input is not valid E-mail!"
//               },
//               {
//                 required: true,
//                 message: "Please input your E-mail!"
//               }
//             ]
//           })(<Input />)}
//         </Form.Item>
//         <Form.Item label="Password">
//           {getFieldDecorator("password", {
//             rules: [
//               {
//                 required: true,
//                 message: "Please input your password!"
//               },
//               {
//                 validator: this.validateToNextPassword
//               }
//             ]
//           })(<Input type="password" />)}
//         </Form.Item>
//         <Form.Item label="Confirm Password">
//           {getFieldDecorator("confirm", {
//             rules: [
//               {
//                 required: true,
//                 message: "Please confirm your password!"
//               },
//               {
//                 validator: this.compareToFirstPassword
//               }
//             ]
//           })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
//         </Form.Item>
//         <Form.Item
//           label={
//             <span>
//               Nickname&nbsp;
//               <Tooltip title="What do you want others to call you?">
//                 <Icon type="question-circle-o" />
//               </Tooltip>
//             </span>
//           }
//         >
//           {getFieldDecorator("nickname", {
//             rules: [
//               {
//                 required: true,
//                 message: "Please input your nickname!",
//                 whitespace: true
//               }
//             ]
//           })(<Input />)}
//         </Form.Item>
//         <Form.Item label="Habitual Residence">
//           {getFieldDecorator("residence", {
//             initialValue: ["zhejiang", "hangzhou", "xihu"],
//             rules: [
//               {
//                 type: "array",
//                 required: true,
//                 message: "Please select your habitual residence!"
//               }
//             ]
//           })(<Cascader options={residences} />)}
//         </Form.Item>
//         <Form.Item label="Phone Number">
//           {getFieldDecorator("phone", {
//             rules: [
//               { required: true, message: "Please input your phone number!" }
//             ]
//           })(<Input addonBefore={prefixSelector} style={{ width: "100%" }} />)}
//         </Form.Item>
//         <Form.Item label="Website">
//           {getFieldDecorator("website", {
//             rules: [{ required: true, message: "Please input website!" }]
//           })(
//             <AutoComplete
//               dataSource={websiteOptions}
//               onChange={this.handleWebsiteChange}
//               placeholder="website"
//             >
//               <Input />
//             </AutoComplete>
//           )}
//         </Form.Item>
//         <Form.Item
//           label="Captcha"
//           extra="We must make sure that your are a human."
//         >
//           <Row gutter={8}>
//             <Col span={12}>
//               {getFieldDecorator("captcha", {
//                 rules: [
//                   {
//                     required: true,
//                     message: "Please input the captcha you got!"
//                   }
//                 ]
//               })(<Input />)}
//             </Col>
//             <Col span={12}>
//               <Button>Get captcha</Button>
//             </Col>
//           </Row>
//         </Form.Item>
//         <Form.Item {...tailFormItemLayout}>
//           {getFieldDecorator("agreement", {
//             valuePropName: "checked"
//           })(
//             <Checkbox>
//               I have read the <a href="">agreement</a>
//             </Checkbox>
//           )}
//         </Form.Item>
//         <Form.Item {...tailFormItemLayout}>
//           <Button type="primary" htmlType="submit">
//             Register
//           </Button>
//         </Form.Item>
//       </Form>
//       </div>
//     );

//   }
// }

// export const WrappedRegistrationForm = Form.create({ name: "register" })(
//   RegistrationForm
// );
