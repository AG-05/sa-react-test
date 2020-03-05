//@flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    cell: ({ size, backgroundColor }) => ({
        width: `${size}px`,
        height: `${size}px`,
        margin: 0,
        padding: 0,
        border: 'solid 1px #949a99;',
        boxSizing: 'border-box',
        backgroundColor: backgroundColor
    })
});

type Props = {
    size: number,
    backgroundColor: string
};

const Cell = (props: Props) => {
    const classes = useStyles({ size: props.size, backgroundColor: props.backgroundColor });

    return (<div className={classes.cell} />);
}

export default Cell;
