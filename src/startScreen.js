import React from "react"



function StartScreen(props) {
    return (
        <div className="transition_screen start">
            
            <h1>Consu<em>Mais</em></h1>
            
            <div className="button_container">
                <button onClick={props.handleClick}>Jogar</button>
            </div>

            <h4 className="credits">
                Baseado no jogo: <a target={"_blank"} rel="noreferrer" href="http://www.higherlowergame.com/">The Higher or Lower Game.</a>
                <br></br>
                Desenvolvido para a matéria de Sustentabilidade 2023 - UFSCar Sorocaba.
            </h4>
        </div>
    )
}

export { StartScreen }