import axios from "axios"
import { GetStaticProps, NextPage } from "next";

interface Data {
    title: string;
    id: number;
}

interface IsrPageProps {
    data: Data[];
}

const IsrPage: NextPage<IsrPageProps> = (props) => {
    const { data } = props;

    return (
        <div>
            <ul>
                {data.map((row) => (
                    <li key={row.id}>{row.title}</li> 
                ))}
            </ul>
        </div>
    );
};

export default IsrPage;

export const getStaticProps: GetStaticProps = async (context) => {

    const random = Math.floor(Math.random() * 11);

    const {data} = await axios.get(random % 2 == 0 ? 'https://jsonplaceholder.typicode.com/albums' : 'https://jsonplaceholder.typicode.com/posts')

    return {
        props: {
            data: data
        }, 
        revalidate: 3
    };
}