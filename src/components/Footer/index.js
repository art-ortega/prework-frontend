import React from 'react' 
import Progress from './Progress'
import {Row, Col, Button} from 'reactstrap'

class Footer extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            currentLesson:"",
            continueLesson:"",
        }
    }

    sendContent(next){
        this.props.currentLesson(next)
    }

    render(){
        let question;
        
        {/* lessons = all lessons, lessonNav= the */}
        let {modules, lessons, lessonNav, questions, content} = this.props
        let lessonQuestions;
        {console.log("current content",content)}
        if(content !== undefined){
        lessonQuestions = questions.filter((q,i)=> q.lesson_id === content.id)
        }
        {/* get the id of the lesson that were currently on */}
        {/* add 1 to the id */}
        {/* Gets the next lesson  */}
        let nextLesson;
        if(content){
            nextLesson = lessons.filter((l,i)=> l.id === content.id+1)
        }
        let lastQuestion = 
        console.log("nextLesson", nextLesson)
        {console.log("lessons ",lessons)}

        {console.log("lesson questions",lessonQuestions)}
        return(
            <>
                        <Row>
                            <Col sm={6}>
                                {/* progress meter on the left */}
                                <Progress modules={this.props.modules} lessons={this.props.lessons}/>
                            </Col>
                            {/* continue button on the right*/}
                            {/* check the current lesson were on */}
                            {/*checks questions associated with this lesson and lists the first one that hasn't been completed*/}{/* */}
                            <Col sm={6} className="footer-button" style={{textAlign:"right"}}>
                                {/* if the last question was completed from the previous lesson, then we need to show the next lesson by passing it through the button */}

                                {questions.map((questions,i,arr)=> {
                                    console.log("What is contentID",content)
                                    if(content !== undefined){
                                        if(questions.lesson_id === content.id && !questions.completed && i<lessonQuestions.length){
                                            question = (arr[i+1])
                                        } else if(questions.lesson_id === content.id && questions.completed && i+1 === lessonQuestions.length){
                                            question = (nextLesson[0])
                                        } 
                                        // else if(i+1 ===lessonQuestions.length){
                                        //     question = (nextLesson[0])
                                        // } 
                                        // else{
                                        //     question = (nextLesson[0])                               
                                        // }
                                    }})}
                                    {/* <Button onClick={() => this.sendContent (back)}>Back</Button> */}
                                    <Button onClick={()=> this.sendContent(question)}>Continue</Button>
                            </Col> 
                        </Row>
            </>
        )
    }
}
export default Footer