import React, {useState} from "react";
import "../App.css";
import { refresh,summarise } from "../reducer/Actions";
import { useContextVariable } from "../reducer/ContextProvide";
import { connect } from "react-redux";

function Transscript({ refresh }) {
    const { ContextVariable, setContextVariable } = useContextVariable();
    const { summaryContent, isNewVideo, youtubeid, youtubeLink } = ContextVariable;
    const [loading, setLoading] = useState(false);

    const handleTranslate = async () => {
        setLoading(true);
        try {
            let responseData = await summarise(youtubeid, youtubeLink);
            if ('error' in responseData) {
                await refresh();
                responseData = await summarise(youtubeid, youtubeLink);
            }
            setContextVariable(prevState => ({
                ...prevState,
                summaryContent: responseData,
                isNewVideo: false
            }));

            } catch (error) {
            console.error('Error occurred:', error);
            } finally {
            setLoading(false);
        }
    };

    return (
        <>
        {((summaryContent["title"] !== undefined)&&(!isNewVideo) ) ? (
            <div id="contentToCopy">
                <div className="transcript">
                <div className="title">{summaryContent["title"]}</div>
                    {summaryContent["transscript"].map((item, index) => (
                        <div className="transcript-container" >
                            <div className="time-stamp">
                                <div>{item["start"]}</div>
                            </div>
                            <div className="transcript-text">
                                {item["text"]}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            ):(
            <>
                {loading ? (
                    <div className="loadingSpinner">
                      <p className="summarizeText">Processing</p>
                      <span className="dot">.</span>
                      <span className="dot">.</span>
                      <span className="dot">.</span>
                    </div>
                ) : (
                <div className="summarizeBtn" onClick={handleTranslate}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M7.9281 5.93447L6.51034 7.35158L6.8584 7.69998L8.27617 6.28287L7.9281 5.93447ZM5.27167 4.37487C5.57464 4.07157 6.06487 4.07157 6.36784 4.37487L7.54572 5.55241L6.12795 6.96985L4.95008 5.79198C4.64678 5.48868 4.64678 4.99812 4.95008 4.69581L5.27167 4.37487ZM15.7725 13.7789C16.0758 14.0815 16.0758 14.5731 15.7725 14.8751L15.4522 15.1954C15.1493 15.4986 14.6584 15.4986 14.3561 15.1954L7.2787 8.11798L8.69614 6.69989L15.7725 13.7789ZM2.042 4.24708L2.30444 4.93766L2.99469 5.19977L2.30444 5.46254L2.042 6.15279L1.77956 5.46254L1.0893 5.19977L1.77956 4.93766L2.042 4.24708ZM4.24806 1.25337L4.72359 0L5.19846 1.25337L6.45216 1.7289L5.19846 2.20443L4.72359 3.45812L4.24806 2.20443L2.99469 1.7289L4.24806 1.25337ZM0.740911 1.95212L1.021 1.21121L1.30109 1.95212L2.04167 2.23221L1.30109 2.51328L1.021 3.25353L0.740911 2.51328L0 2.23221L0.740911 1.95212Z" fill="white"/>
                    </svg>
                    <p className="summarizeText">Get Transcript</p>
                </div>
                )}
            </>
            )}
        </>
        
    );
}    
export default connect(null, { refresh})(Transscript);