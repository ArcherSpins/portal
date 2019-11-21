// @flow

export type ChannelType = {
  id: string,
  title: string
}

export type ParameterType = {
  id: string,
  title: string
}

export type CalendarType = {
  year: string,
  january: string,
  february: string,
  march: string,
  april: string,
  may: string,
  june: string,
  july: string,
  august: string,
  september: string,
  october: string,
  november: string,
  december: string
}

export type PositionType = {
  id: string,
  title: string
}

export type DepartmentType = {
  id: string,
  title: string
}

export type ContactType = {
  id: string,
  parameter: ParameterType,
  value: string
}

export type StatusType = {
  displayed: boolean,
  id: string,
  index: number | string,
  taskIds: Array<mixed>,
  title: string
}

export type SourceType = {
  id: string,
  title: string
}

export type SkillsType = {
  id: string,
  title: string
}

export type TimeZoneType = {
  name: string,
  offset: string
}

export type ManagerType = {
  department: null | mixed,
  email: string,
  id: number | string,
  name: string,
  position: null | mixed,
  skills: Array<SkillsType>,
  status: string,
  timeZone: TimeZoneType
}


export type EmployeeType = {
  id: string,
  name: string,
  email: string,
  status: mixed,
  timeZone: string,
  position: PositionType,
  department: DepartmentType,
  skills: Array<SkillsType>
}

export type ColumnType = {
  id: string,
  title: string,
  stages: {
    id: string,
    title: string,
    displayed: boolean
  }
}
