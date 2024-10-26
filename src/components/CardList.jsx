import {MDBCard} from "mdb-react-ui-kit";
import CardMenu from "./CardComponents/CardMenu";
import CardSearch from "./CardComponents/CardSearch";

const CardList = ({ buttons = true }) => {

    return (
        <div className="mt-5">
            <MDBCard>
                <CardSearch></CardSearch>
                <CardMenu enabledButtons={buttons}></CardMenu>
            </MDBCard>
        </div>

    );
}

export default CardList;