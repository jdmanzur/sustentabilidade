import React from "react"

function MangaColumn(props) {
    let column1 = []
    let column2 = []
    for (let i = 0; i < 5; i++) {
        column1.push(<img className="bg_manga" src={props.mData[Math.round(Math.random() * 500)].image} alt="cover" />)
        column2.push(<img className="bg_manga" src={props.mData[Math.round(Math.random() * 500)].image} alt="cover" />)
    }
    return (
        <div className="flex">
            <div className="manga_column">
                {column1}
            </div>
            <div className="manga_column" style={{ marginTop: props.isMobile ? "" : "-100px" }}>
                {column2}
            </div>
        </div>
    )
}

function MangaWallpaper(props) {
    const [width, setWidth] = React.useState(window.innerWidth);
    const isMobile = (width <= 768);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }

    React.useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    return (
        <div className="background">
            <div className="overlay"></div>
            <MangaColumn isMobile={isMobile} mData={props.mData} />
            <MangaColumn isMobile={isMobile} mData={props.mData} />
            {!isMobile && <MangaColumn mData={props.mData} />}
            {!isMobile && <MangaColumn mData={props.mData} />}
            {!isMobile && <MangaColumn mData={props.mData} />}
        </div>
    )
}

function StartScreen(props) {
    return (
        <div className="transition_screen">
            <MangaWallpaper mData={props.mData} />
            <h1>Manga <br></br> <em>Higher</em> Or <em>Lower</em></h1>
            <h5>Based off <a target={"_blank"} rel="noreferrer" href="http://www.higherlowergame.com/">The Higher or Lower Game.</a>
                <br></br>
                Made in React with data web scraped from <a target={"_blank"} rel="noreferrer" href="https://myanimelist.net/topmanga.php?type=bypopularity">MyAnimeList</a> in December 2022.
            </h5>
            <div className="metric_toggle">
                <button className={props.metricToggle ? "" : "selected"} onClick={() => props.setMetricToggle(false)}>
                    Popularity
                </button>
                <button className={props.metricToggle ? "selected" : ""} onClick={() => props.setMetricToggle(true)}>
                    Score
                </button>
            </div>
            <div className="button_container">
                <button onClick={props.handleClick}>Start Game</button>
            </div>
            <h4 className="credits">Made by <a target={"_blank"} rel="noreferrer" href="https://github.com/GauravS43/manga_higher_lower">Gaurav Sharma</a></h4>
        </div>
    )
}

export { StartScreen }