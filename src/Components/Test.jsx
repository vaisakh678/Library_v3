import React, { useState } from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Paper,
    styled,
    Toolbar,
    Typography,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

function Test() {
    const arr = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25,
    ];
    const [tablePage, setTablePage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    console.log(
        `${tablePage * rowsPerPage} - ${tablePage * rowsPerPage + rowsPerPage}`
    );

    return (
        <div className="w-full h-full bg-slate-500fuck flex items-center justify-center">
            <Paper className="bg-slate-500 w-full h-full" sx={{ mt: 2 }}>
                <Toolbar
                    sx={{ height: "8%" }}
                    className="bg-black border-b border-slate-500 rounded-t"
                    variant="dense"
                >
                    <Typography variant="h6" color="white">
                        MCA-2021
                    </Typography>
                </Toolbar>

                <TableContainer
                    sx={{
                        width: "100%",
                        MaxHeight: "84%",
                        height: "84%",
                        // background: "gray",
                    }}
                >
                    <Table size="small" aria-label="a dense table" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>sl.no</StyledTableCell>
                                <StyledTableCell align="right">
                                    Calories
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    Fat
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    Carbs
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {arr
                                .slice(
                                    tablePage * rowsPerPage,
                                    tablePage * rowsPerPage + rowsPerPage
                                )
                                .map((e, idx) => (
                                    <StyledTableRow key={idx}>
                                        <StyledTableCell>{e}</StyledTableCell>
                                        <StyledTableCell align="right">
                                            Orange
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            230
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            202242
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    sx={{
                        height: "50px",
                        // background: "blue",
                    }}
                    component="div"
                    rowsPerPageOptions={[5, 10, 15]}
                    rowsPerPage={rowsPerPage}
                    count={arr.length}
                    page={tablePage}
                    onPageChange={(e, page) => {
                        setTablePage(page);
                        console.log(page);
                    }}
                    onRowsPerPageChange={(e) => {
                        setRowsPerPage(parseInt(e.target.value, 10));
                        setTablePage(0);
                    }}
                />
            </Paper>
        </div>
    );
}

export default Test;
