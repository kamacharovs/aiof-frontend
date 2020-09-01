import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import agent from '../../agent';
import { connect } from 'react-redux';
import { ContainerAiof, RoundBorderBox, TinyPadding, TinyFormLabel } from '../../style/common';
import {
    ASSET_ADD
} from '../../constants/actionTypes';

const mapStateToProps = state => ({
    ...state.finance,
    currentUser: state.common.currentUser,
    profile: state.profile.profile
});

const mapDispatchToProps = dispatch => ({
    onAddForm: (username, asset) =>
        dispatch({ type: ASSET_ADD, payload: agent.Asset.add(asset), username }),
});

class AssetEditor extends React.Component {
    constructor() {
        super();

        this.state = {
            name: '',
            typeName: '',
            value: '',
        };

        this.updateState = field => ev => {
            const state = this.state;
            const newState = Object.assign({}, state, { [field]: ev.target.value });
            this.setState(newState);
        };

        this.submitAddForm = ev => {
            ev.preventDefault();

            const asset = Object.assign({}, this.state);
            const username = this.props.currentUser.username;

            asset.name = asset.name ? asset.name : null;
            asset.typeName = asset.typeName ? asset.typeName : null;
            asset.value = asset.value ? Number(asset.value) : null;

            this.props.onAddForm(username, asset);
        };
    }

    componentDidMount() {
        if (this.props.currentUser && this.props.state) {
            Object.assign(this.state, {
                name: this.props.state.name || '',
                typeName: this.props.state.typeName || '',
                value: this.props.state.value || '',
            });
        }
    }

    componentDidUpdate(nextProps) {
        if (nextProps.currentUser && nextProps.profile) {
            this.setState(Object.assign({}, this.state, {
                name: nextProps.state.name,
                typeName: nextProps.state.typeName,
                value: nextProps.state.value,
            }));
        }
    }

    render() {
        return (
            <ContainerAiof>
                <RoundBorderBox className="col-md-6 offset-md-3 col-xs-12 text-center">
                    <TinyPadding>
                        <Form onSubmit={this.submitAddForm}>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <TinyFormLabel>Asset name</TinyFormLabel>
                                        <Form.Control type="text"
                                            value={this.state.name}
                                            onChange={this.updateState('name')}
                                            placeholder="Name" />
                                        <Form.Text className="text-muted">
                                            Please provide your asset's name
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <TinyFormLabel>Asset type</TinyFormLabel>
                                        <Form.Control type="text"
                                            value={this.state.typeName}
                                            onChange={this.updateState('typeName')}
                                            placeholder="i.e. car" />
                                        <Form.Text className="text-muted">
                                            Please provide your asset's type name (car, house, etc.)
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <TinyFormLabel>Asset value</TinyFormLabel>
                                        <Form.Control type="text"
                                            value={this.state.value}
                                            onChange={this.updateState('value')}
                                            placeholder="i.e. $5000" />
                                        <Form.Text className="text-muted">
                                            Please provide your asset's value
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Button variant="outline-primary" size="sm" type="submit"
                                disabled={this.props.inProgress}>
                                Add Asset
                        </Button>
                        </Form>
                    </TinyPadding>
                </RoundBorderBox>
            </ContainerAiof>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssetEditor);