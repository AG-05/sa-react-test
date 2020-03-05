//@flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Cell from './Cell/index';

const useStyles = makeStyles({
    board: ({ width, height }) => ({
        width: `${width}px`,
        height: `${height}px`,
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'flex-start'
    })
});

type Props = {
    items: Array<Array<number>>,
    width: number,
    height: number
};

const Board = (props: Props) => {
    const cellSize: number = 15;
    const classes = useStyles({ width: props.width * cellSize, height: props.height * cellSize });

    return (
        <div className={classes.board}>
            {props.items.map((rows, i) => (
                rows.map((cell, j) => (
                    <Cell backgroundColor={cell ? 'black' : 'white'} size={cellSize} key={`${i}.${j}`} />
                ))
            ))}
        </div>
    )
};


export default Board;