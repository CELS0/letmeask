import logoImg from '../assets/images/logo.svg';
import { useHistory, useParams } from 'react-router-dom'
import { Button } from '../components/Button';
import { RoomCode } from '../components/roonCode';
import '../styles/room.scss'
import { Questions } from '../components/Questions';
import { useRoom } from '../hooks/useRoom';
import deleteImg from '../assets/images/delete.svg';
import { database } from '../services/firebase';

type RoomParams = {
    id: string;
}

export function AdminRoom() {
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const history = useHistory();
    const { questions, title } = useRoom(roomId);

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm('Tem certeza que você deseja excluir esta pergunta ?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
        }
    }

async function handleEndRoom(){
    await database.ref(`rooms/${roomId}`).update({
        endedAt: new Date(),
    })

    history.push('/')
}

    return (
        <div id="page-room">
            <header>
                <div className="content-header">
                    <img src={logoImg} alt="Letmeask" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
                    </div>
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>
                <div className="questions-list">
                    {questions.map(question => {
                        return (
                            <Questions
                                key={question.id}
                                content={question.content}
                                author={question.author}
                            >
                                <button
                                    type="button"
                                    onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteImg} alt="remover pergunta" />
                                </button>
                            </Questions>
                        )
                    })}
                </div>
            </main>
        </div>
    )
}