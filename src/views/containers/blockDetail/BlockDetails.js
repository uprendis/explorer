// @flow

import * as React from 'react';
import axios from "axios";
import { useRouteMatch, useHistory } from 'react-router-dom';
import { Container, Row, Button, Col } from 'reactstrap';
import Loading from 'src/assets/images/icons/Loading.gif';
import TimeAgo from 'react-timeago'
import {Link} from "react-router-dom";
function BlockDetails() {
    const match = useRouteMatch('/blocks/:blockHash');
    const { params: { blockHash } } = match;
    const hash = blockHash.replace(':', '');
    const [number, setNumber] = React.useState(0);
    const [date, setdate] = React.useState(0);
    const [timestamp, settimestamp] = React.useState(0);
    const [transactions, settransactions] = React.useState(0);
    const [blockHashs, setblockHash] = React.useState(0);
    const [parentHash, setparentHash] = React.useState(0);
    const [Loader, setLoader] = React.useState(false);
    React.useEffect(() => {
        axios({
            method: 'get',
            url: 'http://18.222.120.223:3100/api/v1/get-block?blockNumber=' + hash,
        })
            .then(function (response) {

                let dates = new Date(response.data.data.block.timestamp * 1000);
                console.log(response.data.data);
                let dateString = new Date(dates).toUTCString();
                dateString = dateString.split(' ').slice(0, 4).join(' ');
                setNumber(response.data.data.block.number);
                settimestamp(dates);
                setdate(dateString);
                settransactions(response.data.data.block.transactions);
                setblockHash(response.data.data.block.hash);
                setparentHash(response.data.data.block.parentHash);
                setLoader(true);
            });
    }, [setNumber]);
    return (
        <section className="block-details-wrapper">
            <div className="transaction-wrapper-details transaction-wrapper">
                <div className="d-flex">
                    <div className="title-section">
                        <h2>Block information</h2>
                    </div>
                </div>
                <Row>
                    <Col>
                        {Loader ?
                            (
                                <div>
                                    <div className="details-wrapper">
                                        <div className="first-section">
                                            <Row>
                                                <Col className="col-4 col-sm-3">
                                                    <span>
                                                        Block:
                                            </span>
                                                </Col>
                                                <Col className="col-8 col-sm-9">
                                                    <span className="column-data">
                                                        {number}
                                                    </span>
                                                </Col>
                                                <Col className="col-4 col-sm-3">
                                                    <span>
                                                        Timestamp:
                                            </span>
                                                </Col>
                                                <Col className="col-8 col-sm-9">
                                                    <span className="column-data">
                                                        <TimeAgo date={timestamp} />: <small>
                                                            ({date})
                                                </small>
                                                    </span>
                                                </Col>
                                                <Col className="col-4 col-sm-3">
                                                    <span>
                                                        Transactions:
                                            </span>
                                                </Col>
                                                <Col className="col-8 col-sm-9">
                                                    <span className="column-data ">
                                                        <Link to={`/blocks-tranasctions/${number}`}>{transactions}</Link> transaction in this block
                                            </span>
                                                </Col>
                                                <Col className="col-4 col-sm-3">
                                                    <span>
                                                        BlockHash:
                                            </span>
                                                </Col>
                                                <Col className="col-8 col-sm-9">
                                                    <span className="column-data ">
                                                        {blockHashs}
                                                    </span>
                                                </Col>
                                                <Col className="col-4 col-sm-3">
                                                    <span>
                                                        ParentHash:
                                            </span>
                                                </Col>
                                                <Col className="col-8 col-sm-9">
                                                    <span className="column-data blue">
                                                        {parentHash}
                                                    </span>
                                                </Col>
                                                <Col className="col-4 col-sm-3">
                                                    <span>
                                                        Calculation Time:
                                            </span>
                                                </Col>
                                                <Col className="col-8 col-sm-9">
                                                    <span className="column-data">
                                                        500 ms
                                            </span>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </div>
                            )
                            : (<div className="text-center loader-img"><img alt="Search" src={Loading} className="icon" /></div>)
                        }
                    </Col>
                </Row>
            </div>
        </section>
    );
}

export default BlockDetails;