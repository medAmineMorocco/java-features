import {Layout, AutoComplete, Switch, Select, Card, Col, Row, Tag, Avatar, Image} from 'antd';
import {TwitterOutlined, MediumOutlined} from '@ant-design/icons';
import {initialFeatures, javaVersions, versionsColors, options} from "./data";
import './App.css';
import {useState} from "react";

function App() {

    const [mode, setMode] = useState('VERSION');
    const [features, setFeatures] = useState(initialFeatures);
    const [selectedVersion, setSelectedVersion] = useState('all');
    const [autocompleteOptions, setAutocompleteOptions] = useState(options);

    function handleSwitchChange(value) {
        if (value) {
            setMode('VERSION');
            filterFeaturesByVersion(selectedVersion);
        } else {
            setMode('FEATURE');
            setFeatures(initialFeatures);
        }
    }

    function handleChange(value) {
        filterFeaturesByVersion(value);
    }

    function onSelectVersion(newVersion) {
        setSelectedVersion(newVersion);
    }

    function onSelectFeature(feature) {
        console.log('feature', feature);
        setFeatures(initialFeatures.filter(({title}) => title === feature));
    }

    const handleSearch = (value) => {
        console.log('search', value);
        if (value === '') {
            setFeatures(initialFeatures);
        }
        setAutocompleteOptions(options.filter(({options}) => options.map(option => option.value.toLowerCase()).includes(value.toLowerCase())));
    };

    function filterFeaturesByVersion(byVersion) {
        if (byVersion === 'all') {
            setFeatures(initialFeatures);
        } else {
            setFeatures(initialFeatures.filter(({version}) => version === byVersion));
        }
    }

    return (
        <Layout>
            <Layout.Header className="header">
                <div className="header-navigation">
                    <Avatar
                        draggable={false}
                        src={
                            <Image
                                src="https://joeschmoe.io/api/v1/random"
                                style={{
                                    width: 32,
                                }}
                            />
                        }
                    />
                    <div className="social-icons-container">
                        <a href="https://twitter.com/ItLabs1" target="_blank" rel="noreferrer">
                            <TwitterOutlined className="twitter-icon"/>
                        </a>
                        <a href="https://medium.com/@mohamedamineammach" target="_blank" rel="noreferrer">
                            <MediumOutlined className="medium-icon"/>
                        </a>
                    </div>
                </div>
            </Layout.Header>

            <Layout.Content className="main-content">
                <div className="search-container">
                    <AutoComplete
                        allowClear={true}
                        disabled={mode === 'VERSION'}
                        dropdownMatchSelectWidth={500}
                        style={{width: 250}}
                        options={autocompleteOptions}
                        placeholder='Example: Var'
                        onSelect={onSelectFeature}
                        onSearch={handleSearch}
                    >
                    </AutoComplete>

                    <Switch className="switch-mode" onChange={handleSwitchChange} checkedChildren="By Version"
                            unCheckedChildren="By Feature" defaultChecked/>

                    <Select disabled={mode === 'FEATURE'} value={selectedVersion} onSelect={onSelectVersion} style={{width: 250}}
                            onChange={handleChange}>
                        <Select.Option value='all'>All</Select.Option>
                        {javaVersions.map(javaVersion => <Select.Option
                            value={javaVersion} key={javaVersion}>Java {javaVersion}</Select.Option>)}
                    </Select>
                </div>

                <Row gutter={16}>

                    {features.map(({title, description, version}) =>
                        <Col xs={24} sm={12} md={8} lg={8} xl={6} className='col' key={title}>
                            <Card title={title} bordered={false} extra={<Tag color={versionsColors[version]}>Java {version}</Tag>}>
                                {description}
                            </Card>
                        </Col>)}
                </Row>
            </Layout.Content>

            <Layout.Footer className='footer'>
                <h3 style={{color: 'white'}}>Join My Newsletter</h3>
                <div id="revue-embed">
                    <form action="https://www.getrevue.co/profile/itlabs1/add_subscriber" method="post" id="revue-form"
                          name="revue-form" target="_blank">
                        <div className="revue-form-group">
                            <input className="revue-form-field" placeholder="Email address" type="email"
                                   name="member[email]" id="member_email"/>
                            <input type="submit" value="Subscribe" name="member[subscribe]" id="member_submit"/>
                        </div>
                        <div className="revue-form-actions">

                        </div>
                        <div className="revue-form-footer">By subscribing, you agree with Revue’s <a target="_blank"
                                                                                                     rel="noreferrer"
                                                                                                     href="https://www.getrevue.co/terms">Terms
                            of Service</a> and <a target="_blank" rel="noreferrer"  href="https://www.getrevue.co/privacy">Privacy
                            Policy</a>.
                        </div>
                    </form>
                </div>
            </Layout.Footer>

        </Layout>
    );
}

export default App;
