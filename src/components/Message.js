import { Alert, Container } from "react-bootstrap"
import { useSelector } from "react-redux"

const Message = () => {
    const message = useSelector(state => state.message)
    return (
        <Container>
            {
                message.text &&
                <Alert variant={message.success? "success" : "danger"}>
                    {message.text}
                </Alert>
            }
        </Container>
    )  
}

export default Message