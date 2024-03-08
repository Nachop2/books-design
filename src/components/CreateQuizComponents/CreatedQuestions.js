import Question from './Question';
import {MDBListGroup} from "mdb-react-ui-kit";

export const CreatedQuestions = ({ preguntas, removeQuestion }) => {

    return (
        <div className="mt-5">
            <MDBListGroup light>
                {
                    preguntas.map(p => {
                        console.log(p);
                        return (<Question key={p.id} pregunta={p} removeQuestion={removeQuestion} />)
                    })
                }
            </MDBListGroup>
        </div>
    )
}

export default CreatedQuestions;