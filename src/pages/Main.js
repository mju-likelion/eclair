import { useEffect, useState } from 'react';
import { postLogin } from '../api/postLogin';
import { getApplication } from '../api/getApplication';
import MAIN_DUMMY from '../MainDummy.json';
import styled from 'styled-components';

const Main = () => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [currentPart, setCurrentPart] = useState('web');

  const data = MAIN_DUMMY.applications;
  const titleList = Object.keys(data[0]);

  useEffect(() => {
    const login = async () => {
      const loginStatusCode = await postLogin();
      console.log(loginStatusCode);
      setIsLoggedin(loginStatusCode === '200');
    };
    login();
  }, []);

  useEffect(() => {
    console.log(isLoggedin);
    const fetchData = async () => {
      if (isLoggedin) {
        const applicationData = await getApplication();
      }
    };
    fetchData();
  }, [isLoggedin]);

  return (
    <div>
      <ButtonBox>
        <Button
          onClick={() => {
            setCurrentPart('web');
          }}
          $part="web"
          $curpart={currentPart}
        >
          Web
        </Button>
        <Button
          onClick={() => {
            setCurrentPart('server');
          }}
          $part="server"
          $curpart={currentPart}
        >
          Server
        </Button>
      </ButtonBox>
      {data && (
        <ContentContainer border="1">
          <Title>
            {titleList.map((t) => (
              // eslint-disable-next-line react/jsx-key
              <th>{t}</th>
            ))}
          </Title>
          <>
            {data?.map((application) => (
              <>
                <Application key={application.id}>
                  <Id>{application.id}</Id>
                  <Content>{application.name}</Content>
                  <Content>{application.studentId}</Content>
                  <Content>{application.phoneNumber}</Content>
                  <Content>{application.part}</Content>
                  <Content>{application.major}</Content>
                  <Content>{application.createdAt.slice(0, 10)}</Content>
                  <Content>
                    <Link href={application.link} target="_blank">
                      {application.link}
                    </Link>
                  </Content>
                </Application>
              </>
            ))}
          </>
        </ContentContainer>
      )}
      <PageNumber>
        <Page></Page>
      </PageNumber>
    </div>
  );
};

const ContentContainer = styled.table`
  width: 100%;
`;
const ButtonBox = styled.div``;
const Button = styled.button`
  margin: 20px 10px;
  padding: 20px;
  font-size: 24px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: ${({ $part, $curpart }) =>
    $curpart === $part ? 'pink' : '#808080'};
  color: ${({ $part, $curpart }) => ($curpart === $part ? 'white' : '#575757')};
  font-weight: ${({ $part, $curpart }) => $curpart === $part && 'bold'};
  cursor: pointer;
`;
const Title = styled.tr`
  justify-content: space-around;
  background-color: pink;
`;
const Application = styled.tr`
  border: 3px solid #ffffff;
`;
const Id = styled.td`
  font-size: 10px;
`;
const Content = styled.td``;
const Link = styled.a`
  color: #ff798d;
  text-underline-position: under;
  text-decoration-thickness: 1px;
`;
const PageNumber = styled.div``;
const Page = styled.div``;
export default Main;
