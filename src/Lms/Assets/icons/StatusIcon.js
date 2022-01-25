import CompleteImg from './complete.svg';
import NotCompleteImg from './NotStarted.svg';
import ProgressImg from './Progress.svg';

export default function StatusIcon(status) {
  if (status === 'COMPLETED') return CompleteImg;
  if (status === 'PROGRESS') return ProgressImg;
  if (status === 'TODO') return NotCompleteImg;
}
