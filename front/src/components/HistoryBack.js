import { useHistory } from "react-router";

const HistoryBack = () => {
    const history= useHistory()
    const back =()=> {
        history.go(-1);
    }

    return ( 
        <span className="float-right"><button onClick={ ()=>back()} className="btn btn-success mb-2"> {"<< "}Retour</button></span>
     );
}
 
export default HistoryBack;