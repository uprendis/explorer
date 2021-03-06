// @flow

import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
import moment from 'moment';
import {Link} from "react-router-dom";
import { useDataProvider } from 'src/utils/DataProvider';
import { usePagination } from 'src/utils/hooks';
import Wrapper from 'src/views/wrapper/wrapper';
import { DataTable } from 'src/views/components/DataTable';
import Loader from 'src/views/components/Loader';
import TableData from 'src/views/containers/BlocksPage/TableData';
import separaterIcon from 'src/assets/images/icons/chevron.svg';

const blockPageStructure = [
    {
        key: 'number',
        header: 'Height',
        render: (height: number) => <span className="icon icon-block">{height}</span>,
        className: "text-primary full head",
    },
    {
        key: 'timestamp',
        header: 'Time',
        render: (timestamp: number) => moment(new Date(timestamp * 1000)).fromNow(),
        className: "text-primary full-wrap txn",
    },
    {
        key: 'transactions',
        header: 'Txn',
        render: (transactions: Array<any>) => transactions.length,
        className: "text-primary full-wrap txn",
    },
    {
        key: 'hash',
        header: 'Hash',
        className: "text-primary full-wrap hash text-ellipsis"
    },
];

function BlocksPage() {
    const [error, setError] = React.useState<string>('');
    const [maxBlockNumber, setMaxBlockNumber] = React.useState(0);
    const [blocks, setBlocks] = React.useState([]);
    const [currentPage, setCurrentPage, setMaxPages] = usePagination();
    const provider = useDataProvider();

    React.useEffect(() => {
        async function fetchData() {
            const result = await provider.getBlocksPageData(currentPage * 10);

            if (result.error) {
                setError(result.error.message);
            } else {
                setBlocks(result.blocks);
                setMaxBlockNumber(result.maxBlockHeight);
                setMaxPages(Math.ceil(result.maxBlockHeight / 10));
            }
        }

        fetchData();
		}, [currentPage, setMaxPages, provider]);

    const historyCallback = React.useCallback((history, data) => history.push(`/blocks/${data.number}`), []);

    let lastBlockNumber = 0;
    let firstBlockNumber = 0;

    if (blocks.length > 0) {
        lastBlockNumber = blocks[blocks.length - 1].number;
        firstBlockNumber = blocks[0].number;
    }

    const descriptionBlock = `Block #${lastBlockNumber} To #${firstBlockNumber} `;
    const totalBlocks = ` ( Total of ${maxBlockNumber} Blocks )`;

    return (
        <div>


            {/* <Wrapper
                title="Blocks"
                onChangePage={setCurrentPage}
                block={descriptionBlock}
                total={totalBlocks}
                currentPage={currentPage}
            >
                {error ? (
                    <p className="text-white">{error}</p>
                ) : (
                        <Row>
                            <Col>
                                {
                                    blocks.length > 0 ? (
                                        <DataTable
                                            structure={blockPageStructure}
                                            rowKey='number'
                                            data={blocks}
                                            historyCallback={historyCallback}
                                        />
                                    ) : <Loader />
                                }
                            </Col>
                        </Row>
                    )}
            </Wrapper> */}

            <div className="breacrumb">
                <Container>
                    <ul className="d-flex justify-content-end">
                        <li><Link to="/">Home</Link></li>
                        <li><span><img alt="Search" src={separaterIcon} className="icon" /></span> </li>
                        <li className="active">Blocks</li>
                    </ul>
                </Container>
            </div>
            <TableData />
        </div>
    );
}

export default BlocksPage;
