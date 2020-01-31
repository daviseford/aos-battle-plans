import {
  TABLE_HEIGHT_FULL,
  TABLE_WIDTH_FULL,
  TABLE_WIDTH_HALF,
  TABLE_HEIGHT_HALF,
  TABLE_WIDTH_QUARTER,
  TABLE_HEIGHT_QUARTER,
} from './table'
import { IScenario } from 'types/scenario'

const Scenarios: IScenario[] = [
  {
    name: `Places of Arcane Power (2019)`,
    matchedPlay: true,
    orientation: `diagonalTopRight`,
    setupRestrictions: {
      fromDividerInches: 12,
      fromSideInches: 0,
      fromPlayerInches: 0, // Unused in Diagonal layouts
    },
    objectives: [
      { x: 18, y: TABLE_HEIGHT_HALF + 12 },
      { x: TABLE_WIDTH_HALF, y: TABLE_HEIGHT_HALF },
      { x: TABLE_WIDTH_FULL - 18, y: TABLE_HEIGHT_HALF - 12 },
    ],
  },
  {
    name: `Total Commitment (2019)`,
    matchedPlay: true,
    orientation: `diagonalTopRight`,
    setupRestrictions: {
      fromDividerInches: 9,
      fromSideInches: 0,
      fromPlayerInches: 0, // Unused in Diagonal layouts
    },
    objectives: [
      { x: 30, y: 6 },
      { x: 6, y: TABLE_HEIGHT_FULL - 24 },
      { x: TABLE_WIDTH_FULL - 6, y: 24 },
      { x: TABLE_WIDTH_FULL - 30, y: TABLE_HEIGHT_FULL - 6 },
    ],
  },
  {
    name: `Shifting Objectives (2019)`,
    matchedPlay: true,
    orientation: `horizontal`,
    setupRestrictions: {
      fromDividerInches: 12,
      fromSideInches: 0,
      fromPlayerInches: 0,
    },
    objectives: [
      { x: 12, y: TABLE_HEIGHT_HALF },
      { x: TABLE_WIDTH_HALF, y: TABLE_HEIGHT_HALF },
      { x: TABLE_WIDTH_FULL - 12, y: TABLE_HEIGHT_HALF },
    ],
  },
  {
    name: `The Better Part of Valour (2019)`,
    matchedPlay: true,
    orientation: `vertical`,
    setupRestrictions: {
      fromDividerInches: 9,
      fromSideInches: 0,
      fromPlayerInches: 0,
    },
    objectives: [
      { x: TABLE_WIDTH_QUARTER, y: TABLE_HEIGHT_HALF - 18 },
      { x: TABLE_WIDTH_QUARTER, y: TABLE_HEIGHT_HALF },
      { x: TABLE_WIDTH_QUARTER, y: TABLE_HEIGHT_HALF + 18 },

      { x: TABLE_WIDTH_FULL - TABLE_WIDTH_QUARTER, y: TABLE_HEIGHT_HALF - 18 },
      { x: TABLE_WIDTH_FULL - TABLE_WIDTH_QUARTER, y: TABLE_HEIGHT_HALF },
      { x: TABLE_WIDTH_FULL - TABLE_WIDTH_QUARTER, y: TABLE_HEIGHT_HALF + 18 },
    ],
  },
  {
    name: `Battle For The Pass`,
    matchedPlay: true,
    orientation: `vertical`,
    setupRestrictions: {
      fromDividerInches: 12,
      fromSideInches: 0,
      fromPlayerInches: 0,
    },
    objectives: [
      { x: TABLE_WIDTH_QUARTER, y: TABLE_HEIGHT_HALF },
      { x: TABLE_WIDTH_HALF, y: TABLE_HEIGHT_HALF - TABLE_HEIGHT_QUARTER },
      { x: TABLE_WIDTH_HALF, y: TABLE_HEIGHT_HALF + TABLE_HEIGHT_QUARTER },
      { x: TABLE_WIDTH_FULL - TABLE_WIDTH_QUARTER, y: TABLE_HEIGHT_HALF },
    ],
  },
  {
    name: `Total Commitment (2018)`,
    matchedPlay: true,
    orientation: `horizontal`,
    setupRestrictions: {
      fromDividerInches: 9,
      fromSideInches: 0,
      fromPlayerInches: 0,
    },
    objectives: [
      { x: TABLE_WIDTH_QUARTER, y: TABLE_HEIGHT_QUARTER },
      { x: TABLE_WIDTH_FULL - TABLE_WIDTH_QUARTER, y: TABLE_HEIGHT_QUARTER },
      { x: TABLE_WIDTH_QUARTER, y: TABLE_HEIGHT_FULL - TABLE_HEIGHT_QUARTER },
      { x: TABLE_WIDTH_FULL - TABLE_WIDTH_QUARTER, y: TABLE_HEIGHT_FULL - TABLE_HEIGHT_QUARTER },
    ],
  },
  {
    name: `Starstrike`,
    matchedPlay: true,
    orientation: `horizontal`,
    setupRestrictions: {
      fromDividerInches: 12,
      fromSideInches: 0,
      fromPlayerInches: 0,
    },
    objectives: [],
  },
  {
    name: `Focal Points (2019)`,
    matchedPlay: true,
    orientation: `horizontal`,
    setupRestrictions: {
      fromDividerInches: 9,
      fromSideInches: 0,
      fromPlayerInches: 0,
    },
    objectives: [
      { x: TABLE_WIDTH_HALF - 12, y: TABLE_HEIGHT_HALF - 12 },
      { x: TABLE_WIDTH_HALF - 12, y: TABLE_HEIGHT_HALF + 12 },
      { x: TABLE_WIDTH_HALF, y: TABLE_HEIGHT_HALF },
      { x: TABLE_WIDTH_HALF + 12, y: TABLE_HEIGHT_HALF - 12 },
      { x: TABLE_WIDTH_HALF + 12, y: TABLE_HEIGHT_HALF + 12 },
    ],
  },
  {
    name: `Scorched Earth (2018)`,
    matchedPlay: true,
    orientation: `horizontal`,
    setupRestrictions: {
      fromDividerInches: 9,
      fromSideInches: 0,
      fromPlayerInches: 0,
    },
    objectives: [
      { x: TABLE_WIDTH_QUARTER, y: TABLE_HEIGHT_QUARTER },
      { x: TABLE_WIDTH_HALF, y: TABLE_HEIGHT_QUARTER },
      { x: TABLE_WIDTH_FULL - TABLE_WIDTH_QUARTER, y: TABLE_HEIGHT_QUARTER },
      { x: TABLE_WIDTH_QUARTER, y: TABLE_HEIGHT_FULL - TABLE_HEIGHT_QUARTER },
      { x: TABLE_WIDTH_HALF, y: TABLE_HEIGHT_FULL - TABLE_HEIGHT_QUARTER },
      { x: TABLE_WIDTH_FULL - TABLE_WIDTH_QUARTER, y: TABLE_HEIGHT_FULL - TABLE_HEIGHT_QUARTER },
    ],
  },
  {
    name: `Scorched Earth (2019)`,
    matchedPlay: true,
    orientation: `vertical`,
    setupRestrictions: {
      fromDividerInches: 9,
      fromSideInches: 0,
      fromPlayerInches: 0,
    },
    objectives: [
      { x: TABLE_WIDTH_QUARTER, y: TABLE_HEIGHT_QUARTER },
      { x: TABLE_WIDTH_HALF, y: TABLE_HEIGHT_QUARTER },
      { x: TABLE_WIDTH_FULL - TABLE_WIDTH_QUARTER, y: TABLE_HEIGHT_QUARTER },
      { x: TABLE_WIDTH_QUARTER, y: TABLE_HEIGHT_FULL - TABLE_HEIGHT_QUARTER },
      { x: TABLE_WIDTH_HALF, y: TABLE_HEIGHT_FULL - TABLE_HEIGHT_QUARTER },
      { x: TABLE_WIDTH_FULL - TABLE_WIDTH_QUARTER, y: TABLE_HEIGHT_FULL - TABLE_HEIGHT_QUARTER },
    ],
  },
]

export default Scenarios
