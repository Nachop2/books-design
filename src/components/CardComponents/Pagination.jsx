import {
  MDBBtn,
  MDBCardHeader,
  MDBCol,
  MDBIcon,
  MDBRow,
  MDBTypography,
  MDBPagination, MDBPaginationItem, MDBPaginationLink
} from "mdb-react-ui-kit";
import { BookInvoiceContext } from "../BookContext";
import { useContext, useEffect } from "react";


const Pagination = ({paginationFunction,paginationInfo}) => {
  useEffect(() => {

  }, [paginationInfo,paginationFunction]);
  return (
    
    <MDBPagination className='mb-0 align-items-center justify-content-center' circle >
      {(paginationInfo[0] - 1) >= 1 ? (
        <>
          <MDBPaginationItem>
            <MDBPaginationLink href='#' aria-label='Previous' className="ps-2 pe-2 pt-1 pb-1 me-1" onClick={(e) => paginationFunction(paginationInfo[4])}>
              <MDBIcon fas icon="angle-double-left" />
            </MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink href='#' className="fw-bold" onClick={(e) => paginationFunction(paginationInfo[5])}>{paginationInfo[0] - 1}</MDBPaginationLink>
          </MDBPaginationItem>
        </>

      ) : (
        <></>
      )}

      <MDBPaginationItem active aria-current='page'>
        <MDBPaginationLink href='#' className="fw-bold" onClick={(e) => paginationFunction(paginationInfo[0])}>{paginationInfo[0]}</MDBPaginationLink>
      </MDBPaginationItem>
      {(paginationInfo[0] + 1) <= paginationInfo[2] ? (
        <>
          <MDBPaginationItem>
            <MDBPaginationLink href='#' className="fw-bold" onClick={(e) => paginationFunction(paginationInfo[1])}>{paginationInfo[0] + 1}</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink href='#' aria-label='Next' className="ps-2 pe-2 pt-1 pb-1 me-1" onClick={(e) => paginationFunction(paginationInfo[3])}>
              <MDBIcon fas icon="angle-double-right" />
            </MDBPaginationLink>
          </MDBPaginationItem>
        </>
      ) : (
        <></>
      )}

    </MDBPagination>
  );

}

export default Pagination