import React, { useState } from 'react';

export default function Reply({reply}) {

  return (
    <div>
      {reply.content}
    </div>
  );
}