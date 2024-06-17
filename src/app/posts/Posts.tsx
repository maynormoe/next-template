'use client';

import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';

import { useQuery } from '@tanstack/react-query';

import { getUserInfo } from '@/apis/user';

type PostsProps = {
  children?: ReactNode;
};

const Posts: FC<PostsProps> = (props) => {
  const {} = props;
  // This useQuery could just as well happen in some deeper
  // child to <Posts>, data will be available immediately either way
  //     这个 useQuery 也可以发生在 <Posts> 的某个更深层次中。
  //   <Posts> 的子代中，无论哪种方式，数据都将立即可用
  const { data } = useQuery({ queryKey: ['user'], queryFn: getUserInfo });
  return <div>{data?.name}</div>;
};

export default memo(Posts);
