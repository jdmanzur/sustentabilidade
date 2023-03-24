import React from "react"
import {fetchInfo} from './InfoObj.js'

function InfoDisplay(props) {
    //var that animates metric, clicked shows components
    const [aniMetric, setAniMetric] = React.useState(0)
    const [clicked, setClicked] = React.useState(false)

    function reset(){
        setClicked(false)
        setAniMetric(0)
    }

    var animate = (metric) => setAniMetric(prevState => prevState + Math.round(metric/100))

    function updateAniMetric(counter, higherClicked){
        if (counter < 100){
            animate(props.mList.value)
            setTimeout(() => updateAniMetric(counter += 1, higherClicked), 5)
        }
        else{
            setAniMetric(props.mList.value)
            higherClicked ? props.handleButtons(true) : props.handleButtons(false)
            setTimeout(reset, 1000)
        }
    }

    function handleClick(higherClicked){
        setClicked(true)
        updateAniMetric(0, higherClicked)
    }

    function interpret(x) {
        //if (props.metricToggle) return x.toString().slice(0,1) + '.' +  x.toString().slice(1)
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
    
    return (
        <div id={props.id} className={props.style.concat(" item_box")}>
            <div className="overlay"></div>
            <img src={props.mList.image} alt={props.mList.name}/>

            <div className="item_info">
                <h1>{props.mList.name}</h1>
                <br></br>
                <h3>{props.mList.action}</h3>
                {clicked && <div className="ani_metric_text">{interpret(aniMetric)}</div>}
                <div className="metric_text">
                    {props.mList.valueStr}
                </div>
                <br></br>

                {!clicked && <div className="button_container">
                    <button onClick={() => handleClick(true)}>Mais</button>
                    <button onClick={() => handleClick(false)}>Menos</button>
                </div> }
                <h3 className="add-text">{props.mList.additional}</h3>
            </div>
        </div>
    )
}


function GameScreen(props) {
    const [order, setOrder] = React.useState([0,1,2,3])
    const [stylePos, setStylePos] = React.useState(["pos_0", "pos_1", "pos_2", "pos_3"])
    const [mList, setMList] = React.useState([{}, {}, {}, {}])
    const [animateButton, setAnimateButton] = React.useState(false)

    //primeira chamada
    React.useEffect(() => {
        setMList([{}, fetchInfo(props.mData), fetchInfo(props.mData), {}])
    }, [props.mData]);

    function determineNewInfo(prevMList){
        let infoArr = prevMList
        
        infoArr[((order[3] % 4) + 4) % 4] = fetchInfo(props.mData)
        return infoArr
    }

    function handleLogic(){
        props.handleScore()
        setOrder(prevOrder => prevOrder.slice(1).concat(prevOrder[0]))
        setStylePos(prevStyles => [prevStyles[3]].concat(prevStyles.slice(0,3)))
        setMList(prevMList => determineNewInfo(prevMList))
        setAnimateButton(false)
    }

    function handleCorrect(){
        setAnimateButton(true)
        setTimeout(handleLogic, 1000)
    }

    function checkMetric(){
        return (mList[order[1]].value <= mList[order[2]].value)
    }

    function handleButtons(higherButton){
        higherButton ? (checkMetric() ? handleCorrect() : props.handleLoss()) : (checkMetric() ? props.handleLoss() : handleCorrect())
    }

    return (
        <div className="container">
            <InfoDisplay 
                id={0} 
                mList = {mList[0]}
                style = {stylePos[0]}
                current = {order[1]}
                handleButtons = {handleButtons}
            />
            <InfoDisplay 
                id={1} 
                mList = {mList[1]}
                style = {stylePos[1]}
                current = {order[1]}
                handleButtons = {handleButtons}
            />
            <InfoDisplay 
                id={2} 
                mList = {mList[2]}
                style = {stylePos[2]}
                current = {order[1]}
                handleButtons = {handleButtons}
            />
            <InfoDisplay 
                id={3} 
                mList = {mList[3]}
                style = {stylePos[3]}
                current = {order[1]}
                handleButtons = {handleButtons}
            />
            
            <button className="exit" onClick={props.handleLoss}>{"\u2715"}</button>
            <div id="middle_circle" className={animateButton ? "to_disappear" : "to_appear"}>
                <h1>VS</h1> 
            </div>
            <h4 className="highscore">Recorde: {props.highScore}</h4>
            <h4 className="score">Pontuação: {props.score}</h4>
        </div>
    )
}

export {GameScreen}