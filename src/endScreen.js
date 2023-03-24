import React from "react"
import { fetchedInfo } from "./InfoObj"

function EndScreen(props) {
    const lastInfo = fetchedInfo[fetchedInfo.length - 1]
    
    return (
        <div className="transition_screen end">
            <div className="overlay"></div>
            
            <h1>Fim do Jogo!</h1>
            <h5>Aprenda mais sobre produção e consumo...
                <br></br>
                <a target={"_blank"} rel="noreferrer" href={props.mData[lastInfo].ref}>{props.mData[lastInfo].name} - {props.mData[lastInfo].additional}</a>
            </h5>
            <div className="flex">
                <h2>Pontuação Final: {props.score}</h2>
                <h2>Recorde: {props.highScore}</h2>
            </div>
            <div className="button_container">
                <button onClick={props.startGame}>Jogar Novamente</button>
                <button onClick={props.returnToMenu}>Menu</button>
            </div>
            <h4 className="credits">Obrigado por jogar!</h4>
        </div>
    )
}

export {EndScreen}