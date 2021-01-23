import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const parent = {
    display: 'flex',
    flexWrap: 'wrap'
}
const child = {
    flexGrow: 1,
    width: '29%',
    height: '160px',
    padding: '1%',
    boxShadow: '1px 2px 3px black',
    margin: '1%'
}
const button = {
    "padding": "0.35em 1.2em", "border": "0.1em solid #FFFFFF", "margin": "0 0.3em 0.3em 0",
    "borderRadius": "0.12em", "background": '#282c34', "float": 'right',
    "fontFamily": "'Roboto',sans-serif", "fontSize": "15px", "color": "#FFFFFF", "textAlign": "center"
}

function Book({ data }) {
    const counter = useSelector(state => state.sessionBooks);
    const filter = useSelector(state => state.sessionBooks);

    const dispatch = useDispatch()
    const searchInput = useRef(null)

    const SearchPanel = () => {
        return (
            <div>
                <div className="row">
                    <div className="col-lg-3">
                    </div>
                    <div className="col-lg-6">
                        <div className="input-group">
                            <input ref={searchInput} type="text" className="form-control" placeholder="Search by Author..." />
                            <span className="input-group-btn">
                                <button className="btn btn-default"
                                    onClick={() => {
                                        const val = searchInput.current.value
                                        dispatch({ type: 'SEARCH_TEXT', payload: val })
                                    }}
                                    type="button">Go!</button>
                            </span>
                            <span className="input-group-btn">
                                <button
                                    onClick={() => dispatch({ type: 'RESET' })}
                                    className="btn btn-default" type="button">Reset!</button>
                            </span>
                        </div>{/* /input-group */}
                    </div>{/* /.col-lg-6 */}
                </div>{/* /.row */}

            </div >
        );
    }

    useEffect(() => {
        console.log('Count updated', counter)
    }, [counter]);

    return (
        <>
            <br />
            <SearchPanel />
            <h4 style={{ textAlign: 'center' }}>Total Records : {counter.length}

            </h4>
            <div className="Book" style={parent}>

                {
                    counter.map((val) => {
                        return (
                            <div key={val.isbn} style={child}>

                                <h4>{val.title}</h4>
                                <cite>{val.authors}</cite>
                                <br />
                                <small> ISBN :{val.isbn} Language: {val.language_code}</small>
                                <br /><br />
                                <label >Rating: {val.average_rating} </label>
                                <meter value={val.average_rating} min="0" max="5"></meter>
                                <br />
                                <button style={button}
                                    onClick={() => {

                                        dispatch({ type: 'ADD_CARD', payload: val })
                                    }}>
                                    Add to card</button>
                            </div>
                        )
                    })
                }
            </div>
        </>

    );
}

export default Book;
