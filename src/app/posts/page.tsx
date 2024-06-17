import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';

import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { getUserInfo } from '@/apis/user';

import Posts from './Posts';

type PostPageProps = {
  children?: ReactNode;
};

const PostPage: FC<PostPageProps> = async (props) => {
  const {} = props;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey: ['posts'], queryFn: getUserInfo });
  return (
    <div>
      {/* 真棒！序列化现在就像传递属性一样简单。 // HydrationBoundary 是一个客户端组件，所以水化过程将在那里进行 */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Posts />
      </HydrationBoundary>
    </div>
  );
};

export default memo(PostPage);
