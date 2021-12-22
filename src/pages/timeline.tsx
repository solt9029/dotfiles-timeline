import dayjs from 'dayjs';
import type { NextPage } from 'next';
import React, { useCallback, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { fetchCommits } from '../api-clients/github';
import { currentUserState } from '../atoms/current-user';
import { githubFollowingUsersState } from '../atoms/github';
import clone from 'just-clone';
import { AppNavbar } from '../components/AppNavbar';
import { Card, Container, Image } from 'react-bootstrap';

const Timeline: NextPage = () => {
  const currentUser = useRecoilValue(currentUserState);
  const [githubFollowingUsers, setGithubFollowingUsers] = useRecoilState(githubFollowingUsersState);

  const shareOnTwitter = (url: string) => {
    const hashtags = 'DotfilesTimeline';

    let newWindow = window.open('', 'child', 'width=600, height=300');
    if (newWindow === null) {
      return;
    }

    newWindow.location.href = `https://twitter.com/share?hashtags=${hashtags}&url=${url}&count=none&lang=ja`;
  };

  const commits = (githubFollowingUsers || [])
    .flatMap(({ commits }) => commits)
    .sort((prev, current) => dayjs(current.date).unix() - dayjs(prev.date).unix());

  return (
    <>
      <AppNavbar />
      <div className="mt-3">
        <Container style={{ maxWidth: 800 }}>
          {currentUser && commits.length === 0 && <div>読み込み中</div>}
          {currentUser &&
            commits.map((commit, index) => (
              <Card key={index} className="mb-3">
                <Card.Header>
                  <Image src={commit.committer.avatarUrl} style={{ height: 30 }} roundedCircle alt="avatar" />
                  <span style={{ paddingLeft: 10, fontWeight: 'bold' }}>@{commit.committer.login}</span>
                  <span className="small text-secondary" style={{ paddingLeft: 10 }}>
                    {dayjs(commit.date).format('YYYY/MM/DD')}
                  </span>
                </Card.Header>
                <Card.Body>{commit.message}</Card.Body>
                <Card.Footer className="small text-secondary">
                  <span style={{ paddingRight: 15 }}>コメント数 {commit.commentCount}</span>
                  <a href={commit.htmlUrl} target="_blank" style={{ paddingRight: 15, color: 'gray' }} rel="noreferrer">
                    詳細を見る
                  </a>
                  <a
                    style={{ textDecoration: 'underline' }}
                    onClick={() => {
                      shareOnTwitter(commit.htmlUrl);
                    }}
                  >
                    共有する
                  </a>
                </Card.Footer>
              </Card>
            ))}
        </Container>
      </div>
    </>
  );
};

export default Timeline;
