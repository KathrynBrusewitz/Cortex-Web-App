import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Table, Divider, Button, Row, Col } from 'antd';
import Stat from '../shared/Stat';
import Loading from '../shared/Loading';

import { contentActions } from '../../actions';

const columns = [{
  title: 'Title',
  dataIndex: 'title',
  key: 'title',
}, {
  title: 'Writers',
  dataIndex: 'creators',
  key: 'creators',
}, {
  title: 'Status',
  dataIndex: 'state',
  key: 'state',
}, {
  title: 'Update Time',
  dataIndex: 'updateTime',
  key: 'updateTime',
}, {
  title: 'Publish Time',
  dataIndex: 'publishTime',
  key: 'publishTime',
}, {
  title: 'Actions',
  dataIndex: 'actions',
  key: 'actions',
  render: (text, record) => (
    <span>
      <Link to={`/articles/${record._id}`}>View</Link>
      <Divider type="vertical" />
      <Link to={`/articles/${record._id}/edit`}>Edit</Link>
      <Divider type="vertical" />
      <Link to="/articles">Delete</Link>
      {!record.publishTime 
        ? <span><Divider type="vertical" /><Link to="/articles">Publish</Link></span>
        : <span><Divider type="vertical" /><Link to="/articles">Unpublish</Link></span>
      }
    </span>
  ),
}];

class ListArticles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
    };
  }

  componentDidMount() {
    this.props.getContents();
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    if (this.props.isGettingContents) {
      return (
        <Loading />
      );
    }

    return (
      <div>
        <h1>Articles</h1>
        <div style={{ marginBottom: 16 }}>
          <Row type="flex" justify="space-between">
            <Col>
              <Button
                type="primary"
                disabled={!hasSelected}
              >
                Publish
              </Button>
              <span style={{ marginLeft: 8 }}>
                {hasSelected ? `Selected ${selectedRowKeys.length} articles` : ''}
              </span>
            </Col>
            <Col>
              <Link to={'/articles/new'}>
                <Button type="primary">
                  Create New Article
                </Button>
              </Link>
            </Col>
          </Row>
        </div>
        <Table rowSelection={rowSelection} dataSource={this.props.contents} columns={columns} loading={this.props.isGettingContents} rowKey={record => record._id} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  contents: state.content.contents,
  isGettingContents: state.content.isGettingContents,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getContents: contentActions.getContents,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ListArticles);
