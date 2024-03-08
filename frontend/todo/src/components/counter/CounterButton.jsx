import PropTypes from 'prop-types'


export default function CounterButton({by,incrementMethod,decrementMethod}){
    
    // function incrementCounterFunction(){   
    //     incrementMethod(by)  
    // }
    
    // function decrementCounterFunction(){
    //     decrementMethod(by)   
    // }
    
    return(
        <div className="Counter">
            <div>
                <button className="counterButton" 
                onClick={()=>incrementMethod(by)}
                //arrow function. empty() represent no parameter, call incrementMethod passing in by as the value
                >+{by}</button>
                
                <button className="counterButton" 
                onClick={()=>decrementMethod(by)}
                >-{by}</button>
            </div>            
        </div>
    )
}
    
    CounterButton.propTypes={
        by: PropTypes.number
    }
    //the type of by should be number{1}, it cant be string "1"
    
    CounterButton.defaultProps={
        by:5
    }
    //if you dont set the value of by, then the default value of by will be 5