// @flow

type CommentType = {
  content: string,
  id: string,
  user: {
    email: string,
    id: string | number,
    name: string,
    skills: Array<{id: string, title: string}>,
    status: string
  }
}

// eslint-disable-next-line import/prefer-default-export
export type { CommentType };
