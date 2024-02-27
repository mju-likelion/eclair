import { useEffect, useState } from 'react';
import { postLogin } from '../api/postLogin';
import { getApplication } from '../api/getApplication';
import MAIN_DUMMY from '../MainDummy.json';
import styled from 'styled-components';

const Main = () => {
  const [applicationData, setApplicationData] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [currentPart, setCurrentPart] = useState('web');
  const [currentPageNumber, setcurrentPageNumber] = useState(1);

  const data = MAIN_DUMMY.applications;
  const titleList = Object.keys(data[0]);

  function renderButtons(totalPageNumber) {
    const buttons = [];
    for (let i = 0; i < totalPageNumber; i++) {
      buttons.push(
        <PageButton
          key={i}
          $pageNumber={i + 1}
          $currentPageNumber={currentPageNumber}
          onClick={() => setcurrentPageNumber(i + 1)}
        >
          Button {i + 1}
        </PageButton>,
      );
    }
    return buttons;
  }

  useEffect(() => {
    const login = async () => {
      const loginStatusCode = await postLogin();
      console.log(loginStatusCode);
      setIsLoggedin(loginStatusCode === '200');
    };
    login();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (isLoggedin) {
        const applicationData = await getApplication(
          currentPart,
          currentPageNumber,
        );
        setApplicationData(applicationData);
      }
    };
    fetchData();
  }, [isLoggedin, currentPageNumber]);

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
      {applicationData && (
        <ContentContainer border="1">
          <Title>
            {titleList.map((t) => (
              // eslint-disable-next-line react/jsx-key
              <th>{t}</th>
            ))}
          </Title>
          <>
            {applicationData?.applications?.map((application) => (
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
      <PageNumberBox>{renderButtons(applicationData.totalPage)}</PageNumberBox>
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
const PageNumberBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;
const PageButton = styled.button`
  background-color: ${({ $pageNumber, $currentPageNumber }) =>
    $pageNumber === $currentPageNumber ? 'pink' : 'white'};
  padding: 10px;
  border: 1px solid
    ${({ $pageNumber, $currentPageNumber }) =>
      $pageNumber === $currentPageNumber ? 'white' : 'pink'};
  color: ${({ $pageNumber, $currentPageNumber }) =>
    $pageNumber === $currentPageNumber ? 'white' : 'pink'};
  border-radius: 8px;
  cursor: pointer;
`;
export default Main;
