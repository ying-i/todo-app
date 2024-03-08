const person ={
    name:'Yingying',
    address:{
        line1:'Snipe',
        line2:'Galway',
        country:'Ireland'
    },
    profiles:['twitter','linkdin','instagram'],
    printProfile:() =>{

        person.profiles.map(
            (profile)=>{
                console.log(profile)
            }
        )

    }
}




export default function LearningJavaScript(){
    return(
        <div>
            <div>{person.name}</div>
            <div>{person.address.line1}</div>
            <div>{person.profiles[0]}</div>
            <div>{ person.printProfile() }</div>
        </div>
    )
}