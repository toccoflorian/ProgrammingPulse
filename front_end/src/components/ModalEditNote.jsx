import { useContext, useState } from "react";
import propTypes from "prop-types";
import styles from "./Modals.module.scss";
import { FetchContext } from "../contexts/FetchContext";

let defaultHoverValue = "transparent-gray-star.png%".repeat(5).split("%");

export default function ModalEditNote(props) {

    const { fetchData } = useContext(FetchContext);

    const [hoverValue, setHoverValue] = useState(defaultHoverValue);
    const [selectedNote, setSelectedNote] = useState(0);

    function handleHoverStars(e) {
        const note = parseInt(e.target.id);
        const arr = [];
        for (let i = 0; i < 5; i++) {
            i < note ?
                arr.push("transparent-yellow-star.png")
                :
                arr.push("transparent-gray-star.png")
        }
        setHoverValue(arr)
    }

    function handleStarClick(e) {
        e.stopPropagation();
        const note = parseInt(e.target.id);
        const arr = [];
        for (let i = 0; i < 5; i++) {
            i < note ?
                arr.push("transparent-yellow-star.png")
                :
                arr.push("transparent-gray-star.png")
        }
        defaultHoverValue = arr;
        setSelectedNote(note)
    }

    function handleQuit(e) {
        e.stopPropagation();
        document.getElementById("modalEditNote").style.display = "None"
    }


    return (<>
        <div onClick={handleQuit} id={props.id} className={`${styles.modalContainer} justify-center align-center`}>
            <div onClick={(e) => { e.stopPropagation() }}>
                <h2>Quelle note souhaitez vous attribuer au projet {props.project.project_name} ?</h2>

                <div className={`d-flex justify-center`}>

                    <img id={1} onClick={handleStarClick} onMouseEnter={handleHoverStars} onMouseOut={() => { setHoverValue(defaultHoverValue) }} src={`/images/${hoverValue[0]}`} alt="étoile jaune" />
                    <img id={2} onClick={handleStarClick} onMouseEnter={handleHoverStars} onMouseOut={() => { setHoverValue(defaultHoverValue) }} src={`/images/${hoverValue[1]}`} alt="étoile jaune" />
                    <img id={3} onClick={handleStarClick} onMouseEnter={handleHoverStars} onMouseOut={() => { setHoverValue(defaultHoverValue) }} src={`/images/${hoverValue[2]}`} alt="étoile jaune" />
                    <img id={4} onClick={handleStarClick} onMouseEnter={handleHoverStars} onMouseOut={() => { setHoverValue(defaultHoverValue) }} src={`/images/${hoverValue[3]}`} alt="étoile jaune" />
                    <img id={5} onClick={handleStarClick} onMouseEnter={handleHoverStars} onMouseOut={() => { setHoverValue(defaultHoverValue) }} src={`/images/${hoverValue[4]}`} alt="étoile jaune" />

                </div>

                <h2>Merci de laisser un commentaire.</h2>
                <textarea id={`commentText${props.id}`} cols="30" rows="10"></textarea>
                <div className={`d-flex`}>

                    <button
                        className={`ButtonNoPrimary`}
                        onClick={handleQuit}
                    >
                        Annuler
                    </button>

                    <button
                        className={`ButtonYesPrimary`}
                        onClick={() => {
                            fetchData.post(
                                "/edit_note_and_comment",
                                JSON.stringify({
                                    project_id: props.project.id,
                                    note: selectedNote,
                                    comment: document.getElementById(`commentText${props.id}`).value
                                }),
                                "edit_note_and_comment")
                        }}
                    >
                        Valider
                    </button>

                    <p>{selectedNote}</p>
                </div>
            </div>

        </div>
    </>)
}

ModalEditNote.propTypes = {
    id: propTypes.string,
    project: propTypes.object,
    fetchData: propTypes.object,
}