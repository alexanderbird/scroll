import { h } from 'preact';

export const LearnMoreSection = ({ title, children }) => (
  <details>
    <summary>{title}</summary>
    { children }
  </details>
);
