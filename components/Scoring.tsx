import { memo } from 'react';
import useTheme from '@mui/material/styles/useTheme';
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import useMediaQuery from '@mui/material/useMediaQuery';
import FormControlLabel from '@mui/material/FormControlLabel';
import NumberInput from './NumberInput';

export interface ScoringProps {
  totalScore: number | string;
  passScore: number | string;
  turnOffScoring: boolean;
  onChangeTotalScore: (value: string) => void;
  onChangePassScore: (value: string) => void;
  onToggleScoring: (value: boolean) => void;
  turnOffScoringLabel?: string;
  passScoreLabel?: string;
  totalScoreLabel?: string;
  exceededErrText?: string;
}

/**
 * Component For custom question scoring
 */
function Scoring(props: ScoringProps) {
  const theme = useTheme();
  // check if the page size is less than sm
  const isLessThanSm = useMediaQuery(theme.breakpoints.down('sm'));
  const {
    turnOffScoring = false,
    passScore,
    totalScore,
    onChangeTotalScore,
    onChangePassScore,
    onToggleScoring,
    turnOffScoringLabel,
    passScoreLabel,
    totalScoreLabel,
    exceededErrText
  } = props;

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      spacing={isLessThanSm ? undefined : 1}
    >
      <Grid item xs={12} md={3} lg={2}>
        <NumberInput
          fullWidth
          required={!turnOffScoring}
          disabled={turnOffScoring}
          variant="outlined"
          label={totalScoreLabel || 'Total Score'}
          name="totalScore"
          value={totalScore}
          onChange={onChangeTotalScore}
          minValue={0}
        />
      </Grid>
      <Grid item xs={12} md={3} lg={2}>
        <NumberInput
          fullWidth
          required={!turnOffScoring}
          disabled={turnOffScoring}
          type="number"
          variant="outlined"
          label={passScoreLabel || 'Pass Score'}
          name="passScore"
          value={passScore}
          onChange={onChangePassScore}
          errMsg={exceededErrText || 'Pass Score should be less than the Total Score'}
          minValue={0}
          maxValue={totalScore || undefined}
        />
      </Grid>
      <Grid item xs={12} md={4} lg={3} textAlign="left">
        <FormControlLabel
          label={turnOffScoringLabel || 'Turn off scoring'}
          control={
            <Switch
              checked={turnOffScoring}
              onChange={(event) => {
                onToggleScoring(event.target.checked);
              }}
              name="turnOffScoring"
              color="primary"
            />
          }
        />
      </Grid>
    </Grid>
  );
}

export default memo(Scoring);
