import React, { useEffect, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';


export const PieCart = ({isOpen}) =>{
    const [totalRate, setTotalRate] = useState("");
    const [unSuccessRate, setUnSuccessRate] = useState("");
    const [successPercentage, setSuccessPsercentage] = useState("");
    const [unSuccessPercentage, setUnSuccessPsercentage] = useState("");

    useEffect(()=>{
        let cost = 25;
        let un = 10;
        setTotalRate(cost.toString());
        setUnSuccessRate(un.toString());
    },[]);
    return(
        <div hidden={!isOpen}  className="max-size">
            <PieChart
                lineWidth={10}
                style={{fontSize:"6px"}}
                label={({dataEntry})=>`${dataEntry.title} ${dataEntry.value}%`}
                data={[
                    { title: "attempted", value: 10, color: '#E38627' },
                    { title: "successfully", value: 15, color: '#C13C37' },
                ]}
            />
            <div style={{textAlign:"center"}}>
                <div>From <span style={{color:"navy"}}>{totalRate}</span> attempted purchases,</div>
                <div><span style={{color:"navy"}}>{unSuccessRate}</span> were completed successfully.</div>
            </div>
        </div>
    )
}
