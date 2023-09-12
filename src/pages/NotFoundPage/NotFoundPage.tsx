import React from 'react';
import TextWithTitle from 'components/TextWithTitle';

//import styles from './NotFoundPage.module.scss';

const NotFoundPage: React.FC = () => (
    <TextWithTitle title={'Упс!'} text={'Такой страницы не существует'} />
)

export default NotFoundPage;