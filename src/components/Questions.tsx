import '../styles/questions.scss';

type QuestionProps = {
    content: string;
    author: {
        name: string
        avatar: string;
    }
}

export function Questions({
    content,
    author,
  }: QuestionProps){
    return (
        <div className="questions">
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div></div>
            </footer>
        </div>
    )
}