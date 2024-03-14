const colors = ['#FF6347', '#FFD700', '#FF8C00', '#1E90FF', '#32CD32', '#8A2BE2']; // Colors for each question

const DataVisualization = ({ resultsData }) => {
  // Calculate the total percentage for the layout.
  const totalPercentage = resultsData.reduce((acc, { percentage }) => acc + parseFloat(percentage), 0);

  return (
    <div style={{ display: 'flex', width: '100%', border: '3px solid black' }}> {/* This represents the 100% frame */}
      {resultsData.map((data, index) => {
        const { question, percentage } = data;
        const width = `${(parseFloat(percentage) / totalPercentage) * 100}%`; // Calculate the width of each bar based on its percentage of the total

        return (
          <div key={question} style={{
            width: width,
            backgroundColor: colors[index % colors.length], // Cycle through colors for each question
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden', // Prevent content from spilling over
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
            height: '100%', // Set the height to fill the parent container
          }}>
            {percentage}% {/* Display the percentage */}
          </div>
        );
      })}
    </div>
  );
};

export default DataVisualization;
