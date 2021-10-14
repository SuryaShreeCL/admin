import styled from "styled-components"

export const PageWrapper = styled.div`
height : 90vh;
overflow-y : auto;
width : 100%;
position : relative;
overflow-x : hidden;
`;

export const AddButton = styled.button`
color: ${props => props.color};
background-color: transparent;
padding: 2px 15px;
border: 2px solid;
border-color: ${props => props.color};
border-radius: 5px;
cursor: pointer;
`;

export const SaveContainer = styled.div`
width : 100%;
position : absolute;
padding : 12px 30px;
border-top : 2px solid #f1f1f1;
bottom : 0;
display flex;
justify-content : flex-end;
`;

export const ListingDiv = styled.div`
width : 100%;
display : flex;
background-color : ${props => props.color};
padding : 15px;
`;

export const DeleteContainer = styled.div`
width : 100%;
display : flex;
padding : 15px;
`;

export const DeleteLeftWrapper = styled.div`
flex : 1;
justify-content : center;
align-items : center;
border-bottom : 2px solid #f1f1f1;
`;

export const DeleteButtonWrapper = styled.div`
display : flex;
justify-content : center;
align-items : center;
`;

export const NoShoolContainer = styled.div`
height: 35vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`;