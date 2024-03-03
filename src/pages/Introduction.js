import styled from 'styled-components';
import { getIntroductionData } from '../api/getIntroduction';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const Introduction = () => {
  const [searchParams] = useSearchParams();
  const [introducesData, setIntroducesData] = useState({});
  const applicationIdParams = searchParams.get('applicationId');

  useEffect(() => {
    getIntroductionData(applicationIdParams, setIntroducesData);
  }, []);
  console.log(introducesData);

  const { studentId, name, part, introduceDetailVOList } = introducesData;

  return (
    <AllContainer>
      <TitleContainer>
        <Title>
          {studentId} {name} 자기소개서
        </Title>
        <Part>파트: {part}</Part>
      </TitleContainer>
      <NewContainer>
        {introduceDetailVOList?.map((item) => (
          <AnswerContainer key={item.sequence}>
            <Question>
              {item.sequence}. {item.title}
            </Question>
            <Answer readOnly value={item.content} />
            <Length>( {item.content.length} /)</Length>
          </AnswerContainer>
        ))}
      </NewContainer>
    </AllContainer>
  );
};

const AllContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  height: 100%;
  margin: 50px auto;
  gap: 60px;
`;
const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Title = styled.p`
  font-size: 25px;
  font-weight: 700;
`;
const Part = styled.p`
  font-size: 25px;
  font-weight: 700;
`;
const NewContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const AnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Question = styled.p`
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 15px;
`;
const Answer = styled.textarea`
  height: 300px;
  padding: 30px 40px;
  background-color: #d9d9d9;
  color: #000000;
  font-size: 14px;
  font-weight: 700;
  line-height: 25px;
  resize: none;
  outline: none;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #b1b1b1;
    border-radius: 10px;
    height: 50%;
  }
  &::-webkit-scrollbar-track {
    background: #d9d9d9;
  }
`;
const Length = styled.p`
  text-align: end;
  font-size: 24px;
`;

export default Introduction;
